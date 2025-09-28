import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import SideResumeInner from "./SideResumeInner";
import { editMargin } from "@/state/resumeSlice";

export default function SideResume({
  contentRef,
  expanded,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
  expanded: number;
}) {
  const { scale, overlayMarginGuides, resumeMetaData, currentResumeId } =
    useSelector((s: RootState) => s.resume);
  const s = scale / 100;

  const [replaceIsOpen, setReplaceIsOpen] = useState(false);

  const { pageStyle } = resumeMetaData[currentResumeId];

  const PAGE_W = pageStyle === "A4" ? 827 : 850;
  const PAGE_H = pageStyle === "A4" ? 1169 : 1100;
  const dispatch = useDispatch();

  /*
    A4: 8.27 x 11.69 inches
    827 x 1169
  */

  const MARGIN = resumeMetaData[currentResumeId].margin;

  if (MARGIN !== 50 && MARGIN !== 75 && MARGIN !== 100) {
    if (MARGIN === 48) {
      dispatch(editMargin({ margin: 50 }));
    } else if (MARGIN === 96) {
      dispatch(editMargin({ margin: 100 }));
    } else {
      dispatch(editMargin({ margin: 75 }));
    }
  }

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
  const zStyle =
    !overlayMarginGuides || replaceIsOpen || expanded !== -1 ? 0 : 40;
  return (
    <div className="relative" style={{ width: wrapperW, height: wrapperH }}>
      <div
        aria-hidden
        className={`absolute left-[-12px] top-0 h-[115%] pointer-events-none print:hidden rounded-sm`}
        style={{
          zIndex: zStyle,
          width: `${wrapperW + 24}px`,
          backgroundImage: `linear-gradient(
      to bottom,
      rgba(0,0,100,0.2) 0,
      rgba(0,0,100,0.2) ${overlaySize * s}px,
      transparent ${overlaySize * s}px
    )`,
          backgroundSize: `100% ${PAGE_H * s}px`,
          backgroundPosition: `0 ${(PAGE_H - MARGIN) * s}px`,
          backgroundRepeat: "repeat-y",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${s})`, transformOrigin: "top left" }}
      >
        <div ref={contentRef} data-print-root>
          <SideResumeInner
            PAGE_W={PAGE_W}
            PAGE_H={PAGE_H}
            replaceIsOpen={replaceIsOpen}
            setReplaceIsOpen={setReplaceIsOpen}
          />
        </div>
      </div>
    </div>
  );
}
