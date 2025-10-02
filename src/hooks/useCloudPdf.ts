import { useStore } from "react-redux";
import type { RootState } from "@/state/store";
import { sanitizeForSave } from "@/db/persistence";

export function useCloudPdf(workerBase = "https://modular-resume-pdf.88michaelsee.workers.dev") {
    const store = useStore<RootState>();
    return async function handleCloudPdf() {
        const resume = store.getState().resume;
        const payload = { state: sanitizeForSave(resume) };

        const r = await fetch(`${workerBase}/create-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const { token } = await r.json();

        const pdfRes = await fetch(`${workerBase}/render?token=${token}`);
        const blob = await pdfRes.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "Resume.pdf"; a.click();
        URL.revokeObjectURL(url);
    };
}
