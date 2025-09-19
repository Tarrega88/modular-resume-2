import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import GenerateResumeButton from "../GenerateResumeButton";
import PreviousResumeList from "./PreviousResumeList";
import AboutWindow from "./AboutWindow";
import { useState } from "react";

function HomeSelect() {
  const resumeData = useSelector((state: RootState) => state.resume);

  const values = Object.values(resumeData.resumeMetaData).reverse();

  const [aboutIsOpen, setAboutIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 h-full px-10 pt-2 overflow-auto flex flex-col">
      <div className="pt-8 pb-8">
        <GenerateResumeButton />
      </div>

      <PreviousResumeList values={values} />
      <div className="h-full flex justify-end items-end">
        <div className="pb-8">
          <button
            className="text-slate-200 p-2 bg-slate-500 rounded-sm"
            onClick={() => setAboutIsOpen(!aboutIsOpen)}
          >
            About
          </button>
        </div>
      </div>
      <AboutWindow
        isOpen={aboutIsOpen}
        setIsOpen={() => setAboutIsOpen(false)}
      />
      {/* {values.length ? <PreviousResumeList values={values} /> : null} */}
    </div>
  );
}

export default HomeSelect;
