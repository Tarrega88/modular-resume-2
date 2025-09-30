import SideResumeInner from "@/components/SideResumeInner";
import { useEffect } from "react";

export default function PrinterPageLetter() {
  const PAGE_W = 850;
  const PAGE_H = 1100;

  useEffect(() => {
    const cls = "paper-letter";
    document.body.classList.add(cls);

    const tag = document.createElement("style");
    tag.id = "page-size";
    tag.textContent = `@page { size: ${
      cls === "paper-letter" ? "Letter" : "A4"
    }; margin: 0; }`;
    document.head.appendChild(tag);

    (document as any).fonts?.ready?.finally(() =>
      setTimeout(() => window.print(), 100)
    );

    return () => {
      document.body.classList.remove(cls);
      tag.remove();
    };
  }, []);

  return (
    <main id="print-root">
      <div id="resume-pages" inert>
        <SideResumeInner
          PAGE_W={PAGE_W}
          PAGE_H={PAGE_H}
          replaceIsOpen={false}
          setReplaceIsOpen={() => null}
        />
      </div>
    </main>
  );
}
