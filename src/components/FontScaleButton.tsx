// src/components/FontScaleButtons.tsx
import { useEffect, useState } from "react";

type Props = {
  containerSelector?: string; // defaults to '#resume-root'
  min?: number; // 0.8
  max?: number; // 1.2
  step?: number; // 0.05
  storageKey?: string; // 'resume-font-scale'
};

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
const round2 = (n: number) => Math.round(n * 100) / 100;

export default function FontScaleButtons({
  containerSelector = "#resume-root",
  min = 0.8,
  max = 1.2,
  step = 0.02,
  storageKey = "resume-font-scale",
}: Props) {
  const [val, setVal] = useState(1.0);

  const apply = (v: number) => {
    const el = document.querySelector(containerSelector) as HTMLElement | null;
    if (el) el.style.setProperty("--font-scale", String(v));
  };

  // init from storage or computed CSS
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    let start = saved ? parseFloat(saved) : NaN;
    if (!isFinite(start)) {
      const el = document.querySelector(
        containerSelector
      ) as HTMLElement | null;
      const css = el ?? document.documentElement;
      const fromCSS = getComputedStyle(css).getPropertyValue("--font-scale");
      const parsed = parseFloat(fromCSS);
      start = isFinite(parsed) ? parsed : 1.0;
    }
    start = round2(clamp(start, min, max));
    setVal(start);
    apply(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist & apply whenever it changes
  useEffect(() => {
    apply(val);
    localStorage.setItem(storageKey, String(val));
  }, [val]);

  const dec = () => setVal((v) => round2(clamp(v - step, min, max)));
  const inc = () => setVal((v) => round2(clamp(v + step, min, max)));

  const atMin = val <= min + 1e-9;
  const atMax = val >= max - 1e-9;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="min-w-24">Text scale</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          disabled={atMin}
          className="rounded border px-2 py-1 disabled:opacity-50"
          aria-label="Decrease text size"
        >
          –
        </button>
        <span className="w-14 text-right tabular-nums">
          {Math.round(val * 100)}%
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={atMax}
          className="rounded border px-2 py-1 disabled:opacity-50"
          aria-label="Increase text size"
        >
          +
        </button>
      </div>
    </div>
  );
}
