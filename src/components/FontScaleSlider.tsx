// src/components/FontScaleSlider.tsx
import { useEffect, useMemo, useState } from "react";

type Props = {
  containerSelector?: string; // defaults to '#resume-root'
  min?: number; // 0.8
  max?: number; // 1.2
  step?: number; // 0.01
  storageKey?: string; // 'resume-font-scale'
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
const round2 = (n: number) => Math.round(n * 100) / 100;

export default function FontScaleSlider({
  containerSelector = "#resume-root",
  min = 0.8,
  max = 1.2,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apply(value);
    localStorage.setItem(storageKey, String(value));
  }, [value]);

  const pct = useMemo(() => Math.round(value * 100), [value]);

  return (
    <div className="flex flex-col items-center gap-3 text-sm">
      <div className="flex gap-4">
        <label className="">Text scale</label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) =>
            setValue(clamp(parseFloat(e.target.value), min, max))
          }
          className="w-38 accent-current"
          aria-label="Text scale"
        />
      </div>
      <span className="tabular-nums w-12 text-right">{pct}%</span>
    </div>
  );
}
