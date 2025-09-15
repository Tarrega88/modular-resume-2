import { useDispatch, useSelector } from "react-redux";
import { setScale } from "../state/resumeSlice";
import { RootState } from "../state/store";
import FontPicker from "./FontPicker";
import FontScaleButtons from "./FontScaleButton";
import FontScaleSlider from "./FontScaleSlider";

export default function BuilderColumn({ onPrint }: { onPrint: () => void }) {
  const dispatch = useDispatch();

  const { scale } = useSelector((state: RootState) => state.resume);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }
  return (
    <div className="w-64 bg-blue-500">
      <div className="flex flex-col gap-2">
        <input
          type="range"
          min={50}
          max={125}
          value={scale}
          onChange={(e) => handleSetScale(Number(e.target.value))}
          step={1}
        />
        <div>{scale}%</div>
        <button
          className="rounded px-3 py-1 bg-black/80 text-white"
          onClick={onPrint}
        >
          PDF
        </button>
        <FontPicker />
        <FontScaleSlider />
      </div>
    </div>
  );
}
