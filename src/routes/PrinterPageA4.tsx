import SideResumeInner from "@/components/SideResumeInner";
import { useEffect } from "react";

export default function PrinterPageA4() {
  const PAGE_W = 827;
  const PAGE_H = 1169;

  useEffect(() => {
    // const cls = "paper-letter";
    // document.body.classList.add("paper-a4");

    const tag = document.createElement("style");
    tag.id = "page-size";
    tag.textContent = `
    @page { margin: 0; }
    @media print {
        html, body { margin: 0 !important; padding: 0 !important; }
    }
    `;
    document.head.appendChild(tag);

    (document as any).fonts?.ready?.finally(() =>
      setTimeout(() => window.print(), 100)
    );

    return () => {
      //   document.body.classList.remove("paper-a4");
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
          isMobile={true}
        />
      </div>
    </main>
  );
}
