import { toggleShowDividers } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShowDividerToggle() {
  const id = useId();

  const dispatch = useDispatch();

  const { showDividers } = useSelector((state: RootState) => state.resume);

  return (
    <div
      className="py-3 bg-blue-50 select-none"
      title="Dividers are used to create spacing, particularly for page margins"
    >
      <div className="flex justify-center items-center gap-2">
        <label className="cursor-pointer" htmlFor={id}>
          Visible Dividers
        </label>
        <input
          id={id}
          type="checkbox"
          name="marginOverlay"
          checked={showDividers}
          onChange={() => dispatch(toggleShowDividers(!showDividers))}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ShowDividerToggle;
