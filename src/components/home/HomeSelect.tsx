import { useSelector } from "react-redux";
import HomeListRow from "./HomeListRow";
import { RootState } from "@/state/store";
import { FaMagnifyingGlass } from "react-icons/fa6";
import GenerateResumeButton from "../GenerateResumeButton";

function HomeSelect() {
  const resumeData = useSelector((state: RootState) => state.resume);

  const values = Object.values(resumeData.resumeMetaData);

  console.log(values);

  return (
    <div className="bg-slate-800 h-full px-8 pt-2">
      {/* <HomeSelectButton text="New Resume" />
      <HomeSelectButton text=""/> */}
      <div className="pt-8 pb-8">
        <GenerateResumeButton />
        {/* <button className="bg-emerald-600 shadow-lg text-white font-semibold px-2 py-1 rounded-sm outline-1 outline-emerald-100 hover:bg-emerald-500 transiton-all duration-200 cursor-pointer">
          Create New Resume
        </button> */}
      </div>
      <div className="bg-slate-600 rounded-md p-4 flex flex-col gap-2">
        <div className="flex justify-between pb-6">
          <div className="text-emerald-400 font-bold">Past Resumes</div>
          <div className="flex items-center relative">
            <input
              placeholder="Search Resumes"
              className="text-white placeholder:text-slate-300 bg-slate-500 rounded-sm pl-8 pr-2"
            />
            <FaMagnifyingGlass className="text-slate-300 absolute left-2" />
          </div>
        </div>
        {values.map((e, i) => (
          <HomeListRow key={i} text={e.resumeName} createdAt={e.createdAt} />
        ))}
      </div>
    </div>
  );
}

export default HomeSelect;
