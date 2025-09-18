import HomeListRow from "./HomeListRow";
import HomeSelectButton from "./HomeSelectButton";
import ResumeListRow from "./ResumeListRow";

const dummyList = [
  { title: "Resume 1", id: "" },
  { title: "Resume 2", id: "" },
  { title: "Resume 3", id: "" },
  { title: "Resume 4", id: "" },
];

function HomeSelect() {
  return (
    <div className="bg-slate-800 h-full px-8 pt-2">
      {/* <HomeSelectButton text="New Resume" />
      <HomeSelectButton text=""/> */}
      <div>Test</div>
      {dummyList.map((e) => (
        <HomeListRow text={e.title} />
      ))}
    </div>
  );
}

export default HomeSelect;
