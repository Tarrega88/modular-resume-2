import { useDispatch, useSelector } from "react-redux";
import { setScale } from "../../state/resumeSlice";
import { RootState } from "../../state/store";
import FontPicker from "./FontPicker";
import FontScaleSlider from "./FontScaleSlider";
import Slider from "./Slider";
import GeneratePDFButton from "./GeneratePDFButton";
import IconHelper from "./IconHelper";
import { useState } from "react";

export default function BuilderColumn({ onPrint }: { onPrint: () => void }) {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state.resume);
  const [iconHelperExpanded, setIconHelperExpanded] = useState(false);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }
  return (
    <div className="w-90 bg-blue-500 border-r overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col">
        <GeneratePDFButton onPrint={onPrint} />
        <FontPicker />
        <Slider
          title="Zoom"
          min={50}
          max={125}
          step={1}
          value={scale}
          onChange={(e: any) => handleSetScale(Number(e.target.value))}
          oddOrEven="odd"
          displayMult={1}
        />
        <FontScaleSlider />
        <IconHelper />
      </div>
    </div>
  );
}
