import { FaMagnifyingGlass } from "react-icons/fa6";
import HomeListRow from "./HomeListRow";
import { ResumeMetaDataProps } from "@/state/types";

function PreviousResumeList({ values }) {
  return (
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
      {values.map((e: ResumeMetaDataProps, i: number) => (
        <HomeListRow key={i} text={e.resumeName} createdAt={e.createdAt} />
      ))}
    </div>
  );
}

export default PreviousResumeList;
