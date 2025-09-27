import { useEffect } from "react";
import { SANS_OPTIONS, DEFAULT_SANS } from "@/config/fonts";
import FontScaleSlider from "./FontScaleSlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { editFont } from "@/state/resumeSlice";

const TARGET = "#resume-root";
function applyToResume(stack: string) {
  const el = document.querySelector(TARGET) as HTMLElement | null;
  if (el) el.style.setProperty("--font-sans", stack);
}

export default function FontPicker() {
  const dispatch = useDispatch();

  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );

  const { font } = resumeMetaData[currentResumeId];
  const sans = SANS_OPTIONS.find((e) => e.label === font) ?? DEFAULT_SANS;

  function changeFont(e: string) {
    dispatch(editFont({ font: e }));
  }

  useEffect(() => {
    applyToResume(sans.stack);
  }, [font]);

  return (
    <div className="gap-2 text-sm pt-4 bg-blue-50">
      <div className="text-center pb-2 font-bold">Font</div>
      <div className="flex justify-center">
        <select
          className="rounded border px-2 py-1 bg-white text-black"
          value={font}
          onChange={(e) => changeFont(e.target.value)}
        >
          {SANS_OPTIONS.map((e) => (
            <option key={e.label} value={e.label}>
              {e.label}
            </option>
          ))}
        </select>
      </div>
      <FontScaleSlider />
    </div>
  );
}
