import { Provider, useSelector } from "react-redux";
import store, { RootState } from "../src/state/store";
import { useEffect, useRef, useState } from "react";
import { hydrate } from "../src/state/resumeSlice";
import { loadState, saveState } from "../src/db/persistence";

function BootGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const resume = useSelector((s: RootState) => s.resume);

  const hydratedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await loadState();
      if (cancelled) return;
      if (saved) {
        store.dispatch(hydrate(saved));
      }
      hydratedRef.current = true;
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => void saveState(resume), {
          timeout: 1000,
        });
      } else {
        void saveState(resume);
      }
    }, 120);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [resume]);

  if (!ready) return null;
  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BootGate>{children}</BootGate>
    </Provider>
  );
}
