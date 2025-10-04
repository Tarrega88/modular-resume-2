import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import Draggable from "../wrappers/Draggable";
import { getFontStack } from "@/utils/getFontStack";

export default function SideResumeInner({
  PAGE_H,
  PAGE_W,
  replaceIsOpen,
  setReplaceIsOpen,
  activeIndex,
  setActiveIndex,
  expanded,
}) {
  const resumeState = useSelector((s: RootState) => s.resume);
  const currentResume = resumeState.currentResumeId;
  const meta = resumeState.resumeMetaData[currentResume];
  const MARGIN = meta?.margin ?? 75;

  const renderOrder = resumeState.resumes[currentResume] ?? [];

  const ref = useRef<HTMLDivElement | null>(null);

  const fontStack = getFontStack(meta?.font);

  return (
    <div
      id="resume-root"
      className="resume-root text-base"
      ref={ref}
      style={{
        fontFamily: fontStack,
        position: "relative",
        backgroundColor: "white",
        width: `${PAGE_W}px`,
        minHeight: `${PAGE_H}px`,
        lineHeight: 1.4,
        paddingLeft: `${MARGIN}px`,
        paddingRight: `${MARGIN}px`,
        margin: 0,
        paddingBottom: `${replaceIsOpen ? MARGIN * 10 : 0}px`,
        overflow: "hidden",
      }}
    >
      {renderOrder.map((e: any, i: number) => (
        <Draggable
          key={`${e.id}${activeIndex}`}
          renderIndex={i}
          kind={e.kind}
          setReplaceIsOpen={setReplaceIsOpen}
          active={activeIndex === i}
          expanded={expanded}
        >
          <ResumeItemRenderer
            id={e.id}
            kind={e.kind}
            elementId={e.elementId}
            renderUI={true}
          />
        </Draggable>
      ))}
    </div>
  );
}
