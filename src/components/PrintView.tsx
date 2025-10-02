import CloudHydrator from "./CloudHydrator";
import SideResumeInner from "./SideResumeInner";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function PrintView() {
  const { resumeMetaData, currentResumeId } = useSelector(
    (s: RootState) => s.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";
  const PAGE_W = pageStyle === "A4" ? 827 : 850;
  const PAGE_H = pageStyle === "A4" ? 1169 : 1100;

  return (
    <main id="print-root">
      <CloudHydrator />
      <div data-print-root>
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
