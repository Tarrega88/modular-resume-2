import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrate } from "@/state/resumeSlice";

export default function CloudHydrator() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = new URLSearchParams(location.search).get("token");
      if (token) {
        const res = await fetch(
          "https://modular-resume-pdf.88michaelsee.workers.dev/state?token=" +
            token
        );
        const { state } = await res.json();
        dispatch(hydrate(state));
      }
      if ("fonts" in document) await (document as any).fonts.ready;
      (window as any).__renderReady = true;
    })();
  }, []);
  return null;
}
