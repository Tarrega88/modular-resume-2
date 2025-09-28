import { useEffect, useState } from "react";

function isLikelyMobile() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 640
  );
}

export default function MobileNotification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("mobileWarnDismissed") === "1";
    const update = () => setOpen(!dismissed && isLikelyMobile());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!open) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="
        fixed inset-x-0 top-8 z-50 sm:hidden
        bg-slate-800 text-slate-50
        shadow-md
      "
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto max-w-screen-md px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">📱</div>
          <div className="flex-1 text-sm">
            <div className="font-medium">
              Heads up: mobile layout isn’t ready yet.
            </div>
            <div className="opacity-90">
              For the best experience, please use a laptop or desktop.
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("mobileWarnDismissed", "1");
              setOpen(false);
            }}
            className="rounded-md px-2 py-1 text-xs font-medium
                       hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Dismiss mobile notice"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
