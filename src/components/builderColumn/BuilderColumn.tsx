import { useDispatch, useSelector } from "react-redux";
import { setScale } from "../../state/resumeSlice";
import { RootState } from "../../state/store";
import FontPicker from "./FontPicker";
import Slider from "./Slider";
import GeneratePDFButton from "./GeneratePDFButton";
import IconHelper from "./IconHelper";
import { useState } from "react";
import MarginOverlayToggle from "./MarginOverlayToggle";
import SimpleAddSection from "./SimpleAddSection";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ShowDividerToggle from "./ShowDividerToggle";
import BuilderColumnTitle from "./BuilderColumnTitle";
import ResumeNamer from "./ResumeNamer";
import ToggleMonthDisplay from "./ToggleMonthType";
import BuilderColumnMainButton from "./BuilderColumnMainButton";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BuilderColumn({ onPrint }: { onPrint: () => void }) {
  const dispatch = useDispatch();
  const { scale } = useSelector((state: RootState) => state.resume);

  function handleSetScale(num: number) {
    dispatch(setScale(num));
  }

  function handleOpenHelper() {}

  const navigate = useNavigate();

  return (
    <div className="w-90 bg-slate-700 border-r overflow-y-auto overflow-x-hidden pb-16">
      <div className="flex flex-col gap-[1px]">
        <BuilderColumnTitle title="Modular Resume" />
        <ResumeNamer />
        <div className="flex w-full bg-blue-50 h-16 items-center px-3 justify-evenly">
          <BuilderColumnMainButton onClick={() => navigate("/")}>
            <IoMdHome className="text-2xl" />
          </BuilderColumnMainButton>
          <BuilderColumnMainButton text="Help" onClick={handleOpenHelper} />
        </div>
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
        <ToggleMonthDisplay />
        <ShowDividerToggle />
        <MarginOverlayToggle />
        <SimpleAddSection />
        <IconHelper />
      </div>
    </div>
  );
}
