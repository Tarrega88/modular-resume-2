import { editDividerNumber } from "@/state/resumeSlice";
import { DividerProps } from "@/state/types";
import { useDispatch } from "react-redux";
import DynamicInput from "./DynamicInput";

function Divider({ id, height, kind }: DividerProps) {
  const dispatch = useDispatch();
  //TODO: 9/16/2025: allow the custom dropdown to see these (opacity needs to be changed in dropdown)

  function handleOnChange(e: string) {
    let num = Number(e);
    if (num > 1100) num = 1100;
    if (num < 48) num = 48;
    dispatch(editDividerNumber({ field: "height", val: num, id }));
  }

  return (
    <div
      style={{ height: `${height}px` }}
      className="w-full hover:opacity-100 opacity-0 flex flex-col items-center transition-all duration-200 gap-1"
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
        min={48}
        max={1100}
        className="w-4/5"
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
}

export default Divider;
