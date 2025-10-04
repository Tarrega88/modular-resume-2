import CloudHydrator from "./CloudHydrator";
import SideResumeInner from "../resume/SideResumeInner";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function PrintView() {
  const { resumeMetaData, currentResumeId } = useSelector(
    (s: RootState) => s.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";
  const PAGE_W = pageStyle === "A4" ? 827 : 850;
  const PAGE_H = pageStyle === "A4" ? 1169 : 1100;

  const hasMeta = !!resumeMetaData[currentResumeId];

  return (
    <main id="print-root">
      <style>
        {pageStyle === "A4"
          ? "@page { size: A4; margin: 0 }"
          : "@page { size: Letter; margin: 0 }"}
      </style>

      <CloudHydrator />

      <div data-print-root>
        {hasMeta ? (
          <SideResumeInner
            PAGE_W={PAGE_W}
            PAGE_H={PAGE_H}
            replaceIsOpen={false}
            setReplaceIsOpen={() => null}
            activeIndex={-1}
            setActiveIndex={() => null}
            expanded={true}
          />
        ) : (
          <div
            style={{ width: PAGE_W, minHeight: PAGE_H, background: "white" }}
          />
        )}
      </div>
    </main>
  );
}
