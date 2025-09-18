import { useDispatch, useSelector } from "react-redux";
import { setScale } from "../../state/resumeSlice";
import { RootState } from "../../state/store";
import FontPicker from "./FontPicker";
import FontScaleSlider from "./FontScaleSlider";
import Slider from "./Slider";
import GeneratePDFButton from "./GeneratePDFButton";
import IconHelper from "./IconHelper";
import { useState } from "react";
import MarginOverlayToggle from "./MarginOverlayToggle";
import SimpleAddSection from "./SimpleAddSection";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ShowDividerToggle from "./ShowDividerToggle";
import BuilderColumnTitle from "./BuilderColumnTitle";

export default function BuilderColumn({ onPrint }: { onPrint: () => void }) {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state.resume);
  const [iconHelperExpanded, setIconHelperExpanded] = useState(false);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }
  return (
    <div className="w-90 bg-blue-500 border-r overflow-y-auto overflow-x-hidden pb-16">
      <div className="flex flex-col">
        <BuilderColumnTitle title="Modular Resume" />
        <GeneratePDFButton onPrint={onPrint} />
        <Slider
          title=""
          min={50}
          max={125}
          step={1}
          value={scale}
          onChange={(e: any) => handleSetScale(Number(e.target.value))}
          oddOrEven="even"
          displayMult={1}
        >
          <FaMagnifyingGlass />
        </Slider>
        <FontPicker />
        <FontScaleSlider />
        <ShowDividerToggle />
        <MarginOverlayToggle />
        <SimpleAddSection />
        <IconHelper />
      </div>
    </div>
  );
}
