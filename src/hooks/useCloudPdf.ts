import { useStore } from "react-redux";
import type { RootState } from "@/state/store";
import { sanitizeForSave } from "@/db/persistence";

function isTransientRenderError(text: string, status?: number) {
    const msg = text || "";
    return (
        status === 503 ||
        msg.includes("No browser available") ||
        msg.includes("Target page, context or browser has been closed")
    );
}

export function useCloudPdf(
    workerBase = "https://modular-resume-pdf.88michaelsee.workers.dev",
    filename = "Resume.pdf"
) {
    const store = useStore<RootState>();

    return async function handleCloudPdf() {
        const resume = store.getState().resume;
        const payload = { state: sanitizeForSave(resume) };

        const createRes = await fetch(`${workerBase}/create-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        if (!createRes.ok) {
            const msg = await createRes.text().catch(() => "");
            console.error("create-token failed:", msg);
            throw new Error(msg || `create-token failed with ${createRes.status}`);
        }

        const { token } = (await createRes.json()) as { token?: string };
        if (!token) throw new Error("No token returned from create-token");

        let attempt = 0;
        let lastErrText = "";
        while (attempt < 2) {
            const res = await fetch(
                `${workerBase}/render?token=${encodeURIComponent(token)}`,
                { cache: "no-store" }
            );

            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                return;
            }

            const text = await res.text().catch(() => "");
            lastErrText = text;
            if (attempt === 0 && isTransientRenderError(text, res.status)) {
                attempt++;
                await new Promise((r) => setTimeout(r, 500));
                continue;
            }

            console.error("Cloud render failed:", text);
            throw new Error(text || `render failed with ${res.status}`);
        }

        throw new Error(lastErrText || "render failed");
    };
}
