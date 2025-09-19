import { changeMonthType } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";

function ToggleMonthDisplay() {
  const id = useId();

  const dispatch = useDispatch();

  const { monthType } = useSelector((state: RootState) => state.resume);

  return (
    <div
      className="py-3 bg-blue-50 select-none"
      title="Toggles between abbreviated and full months"
      onKeyDown={(e) =>
        e.key === "Enter" &&
        dispatch(changeMonthType(monthType === "short" ? "long" : "short"))
      }
    >
      <div className="flex justify-center items-center gap-2">
        <label className="cursor-pointer" htmlFor={id}>
          Abbreviate Months
        </label>
        <input
          id={id}
          type="checkbox"
          name="monthToggle"
          checked={monthType === "short"}
          onChange={() =>
            dispatch(changeMonthType(monthType === "short" ? "long" : "short"))
          }
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ToggleMonthDisplay;
