import { toggleOverlayMarginGuides } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";

function MarginOverlayToggle() {
  const id = useId();

  const dispatch = useDispatch();

  const { overlayMarginGuides } = useSelector(
    (state: RootState) => state.resume
  );

  return (
    <div
      className="py-3 bg-blue-50 select-none"
      title="Shows the margin guides, which are recommended areas for the divider section"
    >
      <div className="flex justify-center items-center gap-2">
        <label className="cursor-pointer" htmlFor={id}>
          Show Margin Overlay
        </label>
        <input
          id={id}
          type="checkbox"
          name="marginOverlay"
          checked={overlayMarginGuides}
          onClick={() =>
            dispatch(toggleOverlayMarginGuides(!overlayMarginGuides))
          }
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default MarginOverlayToggle;
