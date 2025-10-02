// src/worker.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import playwright, { type Browser } from '@cloudflare/playwright';
import { nanoid } from 'nanoid';
import type { KVNamespace } from '@cloudflare/workers-types';

type Env = {
    STATE_KV: KVNamespace;
    RENDER_BASE_URL: string;
    MYBROWSER: unknown; // Browser binding from wrangler.toml
};

const app = new Hono<{ Bindings: Env }>();

app.use('/*', cors({
    origin: (origin) => origin,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    maxAge: 600,
}));

app.get('/', (c) => c.text('OK'));

app.post('/create-token', async (c) => {
    try {
        const body = await c.req.json<{ state: unknown }>();
        if (!body || typeof body !== 'object') return c.json({ error: 'invalid body' }, 400);

        const token = nanoid();
        await c.env.STATE_KV.put(`render:${token}`, JSON.stringify({ state: body.state }), {
            expirationTtl: 600, // 10 minutes
        });
        return c.json({ token });
    } catch {
        return c.json({ error: 'bad request' }, 400);
    }
});

app.get('/state', async (c) => {
    const token = c.req.query('token');
    if (!token) return c.json({ error: 'missing token' }, 400);
    const json = await c.env.STATE_KV.get(`render:${token}`);
    if (!json) return c.json({ error: 'not found or expired' }, 404);
    return new Response(json, { headers: { 'Content-Type': 'application/json' } });
});

/* -------------------- helpers -------------------- */

async function launchWithRetry(env: Env, tries = 3): Promise<Browser> {
    let last: any;
    for (let i = 0; i < tries; i++) {
        try {
            return await playwright.launch(env.MYBROWSER as any);
        } catch (e: any) {
            const msg = String(e?.message || e);
            const transient = msg.includes('No browser available') || msg.includes('503');
            if (!transient || i === tries - 1) throw e;
            await new Promise((r) => setTimeout(r, 300 * (i + 1)));
            last = e;
        }
    }
    throw last;
}

function isTransientNavClose(err: unknown) {
    const msg = String((err as any)?.message || err);
    return msg.includes('Target page, context or browser has been closed');
}

/* -------------------- render -------------------- */

async function renderOnce(c: any, url: string, browser?: Browser) {
    if (!browser) browser = await launchWithRetry(c.env);

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120_000);
    page.setDefaultTimeout(120_000);

    // Navigate without hard-blocking on networkidle
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    // Best-effort quiet network (ignore if not achieved)
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => { });

    // App readiness + fonts
    await page.waitForSelector('[data-print-root]');
    await page.waitForFunction(() => (globalThis as any).__renderReady === true, { timeout: 90_000 });
    await page.evaluate(async () => {
        if ('fonts' in document) {
            // @ts-ignore
            await (document as any).fonts.ready;
        }
    });

    const pdf = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
    });

    return { browser, pdf };
}

app.get('/render', async (c) => {
    const token = c.req.query('token') ?? '';
    const base = (c.env.RENDER_BASE_URL || '').replace(/\/+$/, '');
    if (!token) return c.text('missing token', 400);
    if (!base) return c.text('RENDER_BASE_URL not set', 500);

    const url = `${base}?token=${encodeURIComponent(token)}`;

    let browser: Browser | undefined;
    try {
        // First attempt
        let result: { browser: Browser; pdf: ArrayBuffer };
        try {
            browser = await launchWithRetry(c.env);
            result = await renderOnce(c, url, browser);
        } catch (err) {
            // One retry on transient nav-close flake
            if (isTransientNavClose(err)) {
                if (browser) { try { await browser.close(); } catch { } }
                browser = await launchWithRetry(c.env);
                result = await renderOnce(c, url, browser);
            } else {
                throw err;
            }
        }

        const pdf = result.pdf;

        // Optional: one-time token cleanup
        // await c.env.STATE_KV.delete(`render:${token}`);

        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Resume.pdf"',
                'Cache-Control': 'no-store',
                'X-Render-URL': url,
            },
        });
    } catch (err: any) {
        console.error('render error:', err?.stack || err);
        return new Response(`Render failed:\n${err?.message || err}`, { status: 500 });
    } finally {
        if (browser) { try { await browser.close(); } catch { } }
    }
});

export default app;
