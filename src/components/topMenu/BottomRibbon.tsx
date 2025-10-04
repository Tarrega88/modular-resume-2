import { MdOutlineZoomIn } from "react-icons/md";
import RibbonSlider from "./RibbonSlider";
import RibbonFontScaleSlider from "./RibbonFontScaleSlider";
import { useDispatch, useSelector } from "react-redux";
import { setScale } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import LastSaved from "../builderColumn/LastSaved";
import LowerTier2 from "../lowerTier2/LowerTier2";
import MobileCommandStrip from "../MobileCommandStrip";

function BottomRibbon({ activeIndex, setActiveIndex }) {
  const dispatch = useDispatch();

  const { scale, resumeMetaData, currentResumeId, resumes } = useSelector(
    (state: RootState) => state?.resume
  );
  const resume = resumes[currentResumeId];
  const length = resume.length;

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }

  //todo 10/3/2025: Consider making LowerTier2 only visible on desktop to make room for MobileCommandStrip

  return (
    <div className="sticky bottom-0 w-full bg-neutral-700 text-white pb-4 z-50">
      <LowerTier2 />
      <div className="flex justify-between w-full flex-wrap pt-4 bg-neutral-700">
        {activeIndex > -1 ? (
          <MobileCommandStrip
            activeIndex={Math.min(activeIndex, length - 1)}
            setActiveIndex={setActiveIndex}
          />
        ) : null}
        <div className="flex pl-6 flex-wrap pb-2 sm:pb-0">
          <RibbonSlider
            min={40}
            max={110}
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
