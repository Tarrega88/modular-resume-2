import { Hono } from 'hono';
import { cors } from 'hono/cors';
import playwright from '@cloudflare/playwright';
import { nanoid } from 'nanoid';
import type { KVNamespace } from '@cloudflare/workers-types';

type Env = {
    STATE_KV: KVNamespace;
    RENDER_BASE_URL: string;
};
const app = new Hono<{ Bindings: Env }>();

app.use('/*', cors({
    origin: (origin) => origin,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    maxAge: 600,
}));

app.get('/', c => c.text('OK'));
app.post('/create-token', async (c) => {
    try {
        const body = await c.req.json<{ state: unknown }>();
        if (!body || typeof body !== 'object') return c.json({ error: 'invalid body' }, 400);

        const token = nanoid();
        await c.env.STATE_KV.put(`render:${token}`, JSON.stringify({ state: body.state }), {
            expirationTtl: 600,
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

app.get('/render', async (c) => {
    const token = c.req.query('token') ?? '';
    if (!token) return c.text('missing token', 400);

    const base = c.env.RENDER_BASE_URL?.replace(/\/+$/, '') ?? '';
    if (!base) return c.text('RENDER_BASE_URL not set', 500);

    const url = `${base}?token=${encodeURIComponent(token)}`;
    const browser = await playwright.chromium.launch();
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForSelector('[data-print-root]', { timeout: 60000 });
        await page.waitForFunction(() => (globalThis as any).__renderReady === true, { timeout: 60000 });
        await page.evaluate(async () => {
            if ('fonts' in document) {
                await (document as any).fonts.ready;
            }
        });

        const pdf = await page.pdf({
            printBackground: true,
            preferCSSPageSize: true, // honors @page { size: ...; margin: 0; } if you set it
            // If you prefer explicit size instead of @page:
            // width: '8.5in', height: '11in', margin: { top: '0', right: '0', bottom: '0', left: '0' },
        });

        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Resume.pdf"',
                'Cache-Control': 'no-store',
            },
        });
    } finally {
        await browser.close();
    }
});

export default app;
