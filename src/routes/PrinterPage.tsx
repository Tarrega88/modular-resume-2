import MobileResume from "@/components/MobileResume";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export default function PrinterPage() {
  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";

  const PAGE_W = pageStyle === "A4" ? 827 : 850;
  const PAGE_H = pageStyle === "A4" ? 1169 : 1100;

  return (
    <main id="print-root">
      <div
        id="resume-pages"
        style={{ width: PAGE_W, minHeight: PAGE_H, margin: 0 }}
      >
        <MobileResume
          PAGE_W={PAGE_W}
          PAGE_H={PAGE_H}
          replaceIsOpen={false}
          setReplaceIsOpen={null}
        />
      </div>
    </main>
  );
}
