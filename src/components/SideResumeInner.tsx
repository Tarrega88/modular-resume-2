import { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import Draggable from "./wrappers/Draggable";

export const pageMargin = 48;
export const pageWidth = 850;
export const pageHeight = 1100;
export const widthWithoutMargin = pageWidth - pageMargin * 2;

export default function SideResumeInner() {
  const resumeState = useSelector((s: RootState) => s.resume);
  const currentResume = resumeState.currentResumeId;
  const renderOrder = resumeState.resumes[currentResume] ?? [];

  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
  }, []);

  return (
    <div
      id="resume-root"
      className="resume-root text-base"
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: "white",
        width: `${pageWidth}px`,
        minHeight: `${pageHeight}px`,
        lineHeight: 1.4,
        paddingLeft: `${pageMargin}px`,
        paddingRight: `${pageMargin}px`,
        overflow: "hidden",
      }}
    >
      <div className="h-[48px]" />
      {renderOrder.map((e: any, i: number) => (
        <Draggable key={e.id} renderIndex={i} kind={e.kind}>
          <ResumeItemRenderer
            renderIndex={i}
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
