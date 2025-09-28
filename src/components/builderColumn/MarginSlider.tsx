import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { editMargin } from "@/state/resumeSlice";

export default function MarginSlider() {
  const { resumeMetaData, currentResumeId, measurementStyle } = useSelector(
    (state: RootState) => state.resume
  );
  const { margin } = resumeMetaData[currentResumeId];

  const dispatch = useDispatch();

  function handleSetMargin(e: number) {
    if (e !== 50 && e !== 75 && e !== 100) return;
    dispatch(editMargin({ margin: e }));
  }

  const inches = {
    50: '1/2"',
    75: '3/4"',
    100: '1"',
  };

  const cms = {
    50: "1.27 cm",
    75: "1.905 cm",
    100: "2.54 cm",
  };

  const measureDisplay =
    measurementStyle === "metric" ? cms[margin] : inches[margin];

  return (
    <div className="bg-blue-50">
      <div
        className={`w-full flex items-center flex-col gap-2 text-slate-950 pb-2 pt-3`}
      >
        <div className="w-full text-center py-1 font-semibold">Margin</div>
        <input
          className="accent-slate-800 cursor-pointer w-5/6"
          type="range"
          onChange={(e) => handleSetMargin(Number(e.target.value))}
          min={50}
          max={100}
          step={25}
          value={margin}
        />
        <div className="flex items-center gap-2 relative w-full justify-center">
          <div>{measureDisplay}</div>
        </div>
      </div>
    </div>
  );
}
