import { editDividerNumber } from "@/state/resumeSlice";
import { DividerProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import DynamicInput from "./DynamicInput";
import { RootState } from "@/state/store";

function Divider({
  id,
  height,
  renderUI,
}: DividerProps & { renderUI: boolean }) {
  const dispatch = useDispatch();
  const { showDividers } = useSelector((state: RootState) => state.resume);

  const min = 50;
  const max = 550;

  function handleOnChange(e: string) {
    let num = Number(e);
    if (num > max) num = max;
    if (num < min) num = min;
    dispatch(editDividerNumber({ field: "height", val: num, id }));
  }

  const renderStyle = !renderUI
    ? ""
    : showDividers && renderUI
    ? "bg-sky-100"
    : "hover:opacity-100 opacity-0 bg-sky-100";

  return (
    <div>
      <div
        inert={!renderUI}
        style={{ height: `${renderUI ? height : 100}px` }}
        className={`w-full flex flex-col items-center transition-colors duration-200 gap-1 ${renderStyle} print:invisible`}
      >
        <DynamicInput
          text={height.toString()}
          inputWidth="full"
          divWidth="full"
          textAlign="center"
          handleOnSubmit={(e) => handleOnChange(e)}
          key={height}
          placeholderText={height.toString()}
        />
        <input
          type="range"
          value={height}
          min={min}
          max={max}
          className="w-4/5 cursor-pointer"
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </div>
      <div className="h-0 text-white">.</div>
    </div>
  );
}

export default Divider;
