import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { editFontScale } from "@/state/resumeSlice";
import { RxFontSize } from "react-icons/rx";
import RibbonSlider from "./RibbonSlider";

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
const round2 = (n: number) => Math.round(n * 100) / 100;
const containerSelector = "#resume-root";
const storageKey = "resume-font-scale";

function RibbonFontScaleSlider() {
  const dispatch = useDispatch();
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );
  const { fontScale } = resumeMetaData[currentResumeId];

  const apply = (v: number) => {
    const el = document.querySelector(containerSelector) as HTMLElement | null;
    if (!el) {
      console.warn("FontScaleSlider: container not found", containerSelector);
      return;
    }
    el.style.setProperty("--font-scale", String(v));
  };

  useEffect(() => {
    const el = document.querySelector(containerSelector) as HTMLElement | null;
    const saved = localStorage.getItem(storageKey);
    let start = saved ? parseFloat(saved) : NaN;
    if (!isFinite(start)) {
      const scope = el ?? document.documentElement;
      const fromCSS = getComputedStyle(scope).getPropertyValue("--font-scale");
      const parsed = parseFloat(fromCSS);
      start = isFinite(parsed) ? parsed : 1.0;
    }
    start = round2(clamp(start, min, max));
    dispatch(editFontScale(start));
    apply(start);
  }, []);

  useEffect(() => {
    apply(fontScale);
    localStorage.setItem(storageKey, String(fontScale));
  }, [fontScale]);

  const min = 0.8;
  const max = 1.2;
  const mult = 100;
  const step = 0.01;

  return (
    <RibbonSlider
      min={min}
      max={max}
      step={step}
      value={fontScale}
      onChange={(e: any) =>
        dispatch(editFontScale(clamp(parseFloat(e.target.value), min, max)))
      }
      mult={mult}
      textAdd="%"
    >
      <RxFontSize />
    </RibbonSlider>
  );
}

export default RibbonFontScaleSlider;
