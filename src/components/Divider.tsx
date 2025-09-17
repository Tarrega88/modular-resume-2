import { editDividerNumber } from "@/state/resumeSlice";
import { DividerProps } from "@/state/types";
import { useDispatch } from "react-redux";
import DynamicInput from "./DynamicInput";

function Divider({
  id,
  height,
  kind,
  renderUI,
}: DividerProps & { renderUI: boolean }) {
  const dispatch = useDispatch();
  //TODO: 9/16/2025: allow the custom dropdown to see these (opacity needs to be changed in dropdown)

  const min = 48;
  const max = 550;

  function handleOnChange(e: string) {
    let num = Number(e);
    if (num > max) num = max;
    if (num < min) num = min;
    dispatch(editDividerNumber({ field: "height", val: num, id }));
  }

  //TODO 9/17/2025: add in builder column button to show the dividers regardless of hover
  const renderStyle = !renderUI ? "" : "hover:opacity-100 opacity-0 bg-sky-200";

  return (
    <div
      style={{ height: `${height}px` }}
      className={`w-full flex flex-col items-center transition-all duration-200 gap-1 ${renderStyle}`}
    >
      <DynamicInput
        text={height.toString()}
        inputWidth="full"
        divWidth="full"
        textAlign="center"
        handleOnSubmit={(e) => handleOnChange(e)}
        placeholderText={height.toString()}
      />
      <input
        type="range"
        value={height}
        min={min}
        max={max}
        className="w-4/5"
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
}

export default Divider;
