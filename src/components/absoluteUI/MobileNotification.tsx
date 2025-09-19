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
        fixed inset-x-0 top-0 z-50 sm:hidden
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

        <div className="mt-2 flex gap-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="rounded-md px-3 py-1.5 text-xs font-medium
                       bg-slate-700 hover:bg-slate-600"
          >
            Continue anyway
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="rounded-md px-3 py-1.5 text-xs font-medium
                       border border-slate-600 hover:bg-slate-700"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
