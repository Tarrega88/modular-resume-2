import { useEffect, useState } from "react";
import {
  SANS_OPTIONS,
  STORE_SANS,
  DEFAULT_SANS,
  type FontOption,
} from "@/config/fonts";
import FontScaleSlider from "./FontScaleSlider";

const TARGET = "#resume-root";
function applyToResume(stack: string) {
  const el = document.querySelector(TARGET) as HTMLElement | null;
  if (el) el.style.setProperty("--font-sans", stack);
}

export default function FontPicker() {
  const [sans, setSans] = useState<FontOption>(
    () =>
      SANS_OPTIONS.find((o) => o.stack === localStorage.getItem(STORE_SANS)) ??
      DEFAULT_SANS
  );

  useEffect(() => {
    applyToResume(sans.stack);
  }, []);

  useEffect(() => {
    applyToResume(sans.stack);
    localStorage.setItem(STORE_SANS, sans.stack);
  }, [sans]);

  return (
    <div className="gap-2 text-sm pb-1 pt-4 bg-blue-400">
      <div className="text-center pb-2 font-bold">Font</div>
      <div className="flex justify-center">
        <select
          className="rounded border px-2 py-1 bg-white text-black"
          value={sans.stack}
          onChange={(e) =>
            setSans(SANS_OPTIONS.find((o) => o.stack === e.target.value)!)
          }
        >
          {SANS_OPTIONS.map((o) => (
            <option key={o.label} value={o.stack}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
