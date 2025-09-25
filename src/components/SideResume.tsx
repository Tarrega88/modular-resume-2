import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import SideResumeInner from "./SideResumeInner";

export default function SideResume({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
}) {
  const { scale, overlayMarginGuides, resumeMetaData, currentResumeId } =
    useSelector((s: RootState) => s.resume);
  const s = scale / 100;

  const PAGE_W = 850;
  const PAGE_H = 1100;

  const MARGIN = resumeMetaData[currentResumeId].margin;

  //TODO 9/25/2025: add page margin to types & slice per resume
  //temp for testing:

  const overlaySize = MARGIN * 2;

  const [rawH, setRawH] = useState(PAGE_H);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () =>
      setRawH(Math.max(PAGE_H, el.scrollHeight || el.offsetHeight || PAGE_H));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contentRef]);

  const wrapperW = PAGE_W * s;
  const wrapperH = rawH * s;

  //todo 9/16/2025: add button in builder column to set zStyle to z-50 or nothing
  //const zStyle = ""

  const zStyle = overlayMarginGuides ? "z-50" : "";

  return (
    <div className="relative" style={{ width: wrapperW, height: wrapperH }}>
      <div
        aria-hidden
        className={`absolute left-[-12px] top-0 h-[115%] pointer-events-none print:hidden rounded-sm ${zStyle}`}
        style={{
          width: `${wrapperW + 24}px`,
          backgroundImage: `linear-gradient(
      to bottom,
      rgba(0,0,100,0.2) 0,
      rgba(0,0,100,0.2) ${overlaySize * s}px,
      transparent ${overlaySize * s}px
    )`,
          backgroundSize: `100% ${1100 * s}px`,
          backgroundPosition: `0 ${(1100 - MARGIN) * s}px`,
          backgroundRepeat: "repeat-y",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${s})`, transformOrigin: "top left" }}
      >
        <div ref={contentRef} data-print-root>
          <SideResumeInner />
        </div>
      </div>
    </div>
  );
}
