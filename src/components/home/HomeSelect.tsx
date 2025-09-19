import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import GenerateResumeButton from "../GenerateResumeButton";
import PreviousResumeList from "./PreviousResumeList";

function HomeSelect() {
  const resumeData = useSelector((state: RootState) => state.resume);

  const values = Object.values(resumeData.resumeMetaData).reverse();

  return (
    <div className="bg-slate-800 h-full px-10 pt-2 overflow-auto pb-24">
      <div className="pt-8 pb-8">
        <GenerateResumeButton />
      </div>

      <PreviousResumeList values={values} />
      {/* {values.length ? <PreviousResumeList values={values} /> : null} */}
    </div>
  );
}

export default HomeSelect;
