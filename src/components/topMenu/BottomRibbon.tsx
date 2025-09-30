import { MdOutlineZoomIn } from "react-icons/md";
import RibbonSlider from "./RibbonSlider";
import RibbonFontScaleSlider from "./RibbonFontScaleSlider";
import { useDispatch, useSelector } from "react-redux";
import { setScale } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import LastSaved from "../builderColumn/LastSaved";
import LowerTier2 from "../lowerTier2/LowerTier2";

function BottomRibbon() {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state?.resume);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }

  return (
    <div className="sticky bottom-0 w-full bg-neutral-700 text-white pb-4 z-50">
      <LowerTier2 />
      <div className="flex justify-between w-full flex-wrap pt-4 bg-neutral-700">
        <div className="flex pl-6 flex-wrap pb-2 sm:pb-0">
          <RibbonSlider
            min={30}
            max={100}
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
        <div className="bg-neutral-700">
          <LastSaved />
        </div>
      </div>
    </div>
  );
}

export default BottomRibbon;
