import { useDispatch, useSelector } from "react-redux";
import Toggle from "./Toggle";
import { RootState } from "@/state/store";
import {
  toggleOverlayMarginGuides,
  toggleShowDividers,
} from "@/state/resumeSlice";

function Toggles() {
  const dispatch = useDispatch();
  const { overlayMarginGuides, showDividers } = useSelector(
    (state: RootState) => state.resume
  );

  return (
    <div className="flex flex-col gap-2 py-2">
      <Toggle
        text="Visible Dividers"
        checked={showDividers}
        onChange={() => dispatch(toggleShowDividers(!showDividers))}
      />
      <Toggle
        text="Margin Guides"
        checked={overlayMarginGuides}
        onChange={() =>
          dispatch(toggleOverlayMarginGuides(!overlayMarginGuides))
        }
      />
    </div>
  );
}

export default Toggles;
