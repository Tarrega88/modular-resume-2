// CloudHydrator.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrate } from "@/state/resumeSlice";

function raf(): Promise<void> {
  return new Promise<void>((res) => requestAnimationFrame(() => res()));
}
async function afterReactRenders(): Promise<void> {
  await raf();
  await raf();
}

export default function CloudHydrator() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const token = new URLSearchParams(location.search).get("token");
        if (token) {
          const res = await fetch(
            "https://modular-resume-pdf.88michaelsee.workers.dev/state?token=" +
              token,
            { cache: "no-store" }
          );
          if (res.ok) {
            const { state } = await res.json();
            dispatch(hydrate(state)); // updates font label, etc.
            await afterReactRenders(); // let PrintView/SideResumeInner re-render
          }
        }
        if ("fonts" in document) {
          // @ts-ignore
          await (document as any).fonts.ready; // ensure current families are loaded
        }
      } finally {
        (window as any).__renderReady = true;
      }
    })();
  }, [dispatch]);
  return null;
}
