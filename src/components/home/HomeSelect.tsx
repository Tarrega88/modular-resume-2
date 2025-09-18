import { useSelector } from "react-redux";
import HomeListRow from "./HomeListRow";
import HomeSelectButton from "./HomeSelectButton";
import ResumeListRow from "./ResumeListRow";
import { RootState } from "@/state/store";

const dummyList = [
  { title: "Resume 1", id: "" },
  { title: "Resume 2", id: "" },
  { title: "Resume 3", id: "" },
  { title: "Resume 4", id: "" },
];

function HomeSelect() {
  const resumeData = useSelector((state: RootState) => state.resume);

  const entries = Object.values(resumeData.resumeMetaData);

  console.log(entries);

  return (
    <div className="bg-slate-800 h-full px-8 pt-2">
      {/* <HomeSelectButton text="New Resume" />
      <HomeSelectButton text=""/> */}
      <div className="pt-8 pb-8">
        <button className="bg-emerald-600 shadow-lg text-white font-semibold px-2 py-1 rounded-sm outline-1 outline-emerald-100 hover:bg-emerald-500 transiton-all duration-200 cursor-pointer">
          Create New Resume
        </button>
      </div>
      <div className="bg-slate-600 rounded-md p-4 flex flex-col gap-2">
        <div className="text-emerald-400 font-bold">Past Resumes</div>
        {entries.map((e, i) => (
          <HomeListRow key={i} text={e.resumeName} createdAt={e.createdAt} />
        ))}
      </div>
    </div>
  );
}

export default HomeSelect;
