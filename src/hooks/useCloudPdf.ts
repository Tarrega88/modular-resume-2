import { useStore } from "react-redux";
import type { RootState } from "@/state/store";
import { sanitizeForSave } from "@/db/persistence";

export function useCloudPdf(
    workerBase = "https://modular-resume-pdf.88michaelsee.workers.dev"
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
            const msg = await createRes.text();
            console.error("create-token failed:", msg);
            throw new Error(msg || `create-token failed with ${createRes.status}`);
        }
        const { token } = (await createRes.json()) as { token?: string };
        if (!token) throw new Error("No token returned from create-token");

        const renderRes = await fetch(
            `${workerBase}/render?token=${encodeURIComponent(token)}`,
            { cache: "no-store" }
        );
        if (!renderRes.ok) {
            const msg = await renderRes.text();
            console.error("Cloud render failed:", msg);
            throw new Error(msg || `render failed with ${renderRes.status}`);
        }

        const blob = await renderRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Resume.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
}
