import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import GenerateResumeButton from "../GenerateResumeButton";
import PreviousResumeList from "./PreviousResumeList";
import { useState } from "react";
import LastWorkedOn from "./LastWorkedOn";
import AboutContainer from "./AboutContainer";

function HomeSelect() {
  const resumeData = useSelector((state: RootState) => state.resume);

  const values = Object.values(resumeData.resumeMetaData).reverse();

  const [aboutIsOpen, setAboutIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 h-full px-10 pt-2 overflow-auto flex flex-col">
      <div className="flex justify-between items-start pt-8 pb-6 gap-2">
        <div className="flex sm:flex-row flex-col sm:gap-8 gap-4 sm:items-center">
          <GenerateResumeButton />
          {resumeData.currentResumeId ? <LastWorkedOn /> : null}
        </div>
        <div className="flex sm:items-center self-end">
          <button
            onClick={() => setAboutIsOpen(!aboutIsOpen)}
            className="bg-slate-500 outline-gray-100 hover:bg-slate-600 shadow-lg text-white font-semibold px-3 py-1 rounded-sm outline-1  transiton-all duration-200 cursor-pointer h-10"
          >
            About
          </button>
        </div>
      </div>

      {values.length ? <PreviousResumeList values={values} /> : null}
      <div className="h-full flex justify-end items-end">
        <div className="pb-8"></div>
      </div>
      <AboutContainer isOpen={aboutIsOpen} setIsOpen={setAboutIsOpen} />
    </div>
  );
}

export default HomeSelect;
