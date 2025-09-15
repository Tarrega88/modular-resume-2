// FontPicker.tsx
import { useEffect, useState } from "react";
import {
  SANS_OPTIONS,
  STORE_SANS,
  DEFAULT_SANS,
  type FontOption,
} from "@/config/fonts";

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

  // apply on mount (after the resume element exists)
  useEffect(() => {
    applyToResume(sans.stack);
  }, []);

  // apply on change + persist
  useEffect(() => {
    applyToResume(sans.stack);
    localStorage.setItem(STORE_SANS, sans.stack);
  }, [sans]);

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="w-28">Body font</span>
      <select
        className="rounded border px-2 py-1"
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
    </label>
  );
}
