import { useDispatch, useSelector } from "react-redux";
import BulletSelect from "./bulletPoints/BulletSelect";
import { setScale } from "../state/resumeSlice";
import { RootState } from "../state/store";

function BuilderColumn() {
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
          step={5}
        />
        <div>{scale}%</div>
      </div>
      <BulletSelect />
    </div>
  );
}

export default BuilderColumn;
