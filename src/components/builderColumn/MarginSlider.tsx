import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { editMargin } from "@/state/resumeSlice";

export default function MarginSlider() {
  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );
  const { margin } = resumeMetaData[currentResumeId];
  const dispatch = useDispatch();

  function handleSetMargin(e: number) {
    if (e !== 48 && e !== 72 && e !== 96) return;
    dispatch(editMargin({ margin: e }));
  }

  const inches = {
    48: '1/2"',
    72: '3/4"',
    96: '1"',
  };

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
          min={48}
          max={96}
          step={24}
          value={margin}
        />
        <div className="flex items-center gap-2 relative w-full justify-center">
          <div>{inches[margin]}</div>
        </div>
      </div>
    </div>
  );
}
