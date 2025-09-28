import { MdOutlineZoomIn } from "react-icons/md";
import RibbonSlider from "./RibbonSlider";
import RibbonFontScaleSlider from "./RibbonFontScaleSlider";
import { useDispatch, useSelector } from "react-redux";
import { setScale } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import LastSaved from "../builderColumn/LastSaved";

function BottomRibbon() {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state.resume);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }

  return (
    <div className="sm:sticky bottom-0 w-full bg-neutral-700 text-white py-4 z-50">
      <div className="flex justify-between w-full flex-wrap">
        <div className="flex gap-6 pl-6">
          <RibbonSlider
            min={50}
            max={150}
            step={1}
            value={scale}
            mult={1}
            textAdd="%"
            onChange={(e: any) => handleSetScale(Number(e.target.value))}
          >
            <MdOutlineZoomIn />
          </RibbonSlider>
          <RibbonFontScaleSlider />
        </div>
        <div className="px-6">
          <LastSaved />
        </div>
      </div>
    </div>
  );
}

export default BottomRibbon;
