import SideResumeInner from "@/components/SideResumeInner";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrintPage() {
  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";

  const PAGE_W = pageStyle === "A4" ? 827 : 850;
  const PAGE_H = pageStyle === "A4" ? 1169 : 1100;

  useEffect(() => {
    const ready = (document as any).fonts?.ready ?? Promise.resolve();
    ready.finally(() => {
      setTimeout(() => window.print(), 100);
    });
  }, []);

  return (
    <main id="print-root">
      <div id="resume-pages" style={{ width: PAGE_W, minHeight: PAGE_H }} inert>
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
