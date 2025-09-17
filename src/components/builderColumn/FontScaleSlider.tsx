import { useEffect, useState } from "react";
import Slider from "./Slider";

type Props = {
  containerSelector?: string; // defaults to '#resume-root'
  min?: number;
  max?: number;
  step?: number;
  storageKey?: string;
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
const round2 = (n: number) => Math.round(n * 100) / 100;

export default function FontScaleSlider({
  containerSelector = "#resume-root",
  min = 0.9,
  max = 1.1,
  step = 0.01,
  storageKey = "resume-font-scale",
}: Props) {
  const [value, setValue] = useState(1.0);

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
    setValue(start);
    apply(start);
  }, []);

  useEffect(() => {
    apply(value);
    localStorage.setItem(storageKey, String(value));
  }, [value]);

  return (
    <Slider
      title="Scale Font"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e: any) =>
        setValue(clamp(parseFloat(e.target.value), min, max))
      }
      oddOrEven="even"
      displayMult={100}
    />
  );
}
