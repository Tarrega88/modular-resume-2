import { Kinds } from "@/state/types";

const sections = [
  { title: "Bullet", kind: "bulletPoint" },
  { title: "Contact", kind: "userInfo" },
  { title: "Education", kind: "education" },
  { title: "Experience", kind: "prevJob" },
  { title: "Header", kind: "sectionHeader" },
  { title: "List", kind: "skill" },
  { title: "Project", kind: "project" },
  { title: "Text", kind: "summary" },
  { title: "Divider", kind: "divider" },
];

type Props = {
  renderIndex: number;
  setIsExpanded(e: boolean): void;
  replace: boolean;
  kind: Kinds;
  setKind(e: Kinds): void;
  section: string;
};
function ListOfKinds({
  renderIndex,
  setIsExpanded,
  replace,
  setKind,
  kind,
  section,
}: Props) {
  // const buttonStyle = kind ===
  //bg-slate-700 hover:bg-slate-800 text-slate-100

  return (
    <div>
      {/* <div className="px-4 bg-slate-800 text-slate-50 pb-1">
        Or start with a default:
      </div> */}
      <div className="px-1 flex gap-3 justify-center bg-slate-400 py-2">
        {/* <div className="flex items-center">
          <button
            className="bg-sky-600 hover:bg-sky-500 rounded-sm px-2 text-white cursor-pointer transition-all duration-200 h-full w-12"
            onClick={() => handleAddNewSection(kind)}
          >
            +
          </button>
        </div> */}
        {sections.map((e: { title: string; kind: Kinds }, i) => (
          <div className="" key={i}>
            <button
              className={`${
                e.kind === kind ? " outline-3" : ""
              } bg-slate-700 hover:bg-slate-800 text-slate-100 h-10 rounded-sm w-max px-2 cursor-pointer transition-colors duration-200`}
              onClick={() => setKind(e.kind)}
            >
              {e.title}
            </button>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col items-center justify-center w-full py-2 border-b">
        <button
          className="bg-emerald-600 text-white hover:bg-emerald-500 px-2 cursor-pointer transition-all duration-200 h-10 w-1/2 font-bold rounded-sm"
          onClick={() => handleAddNewSection(kind)}
        >
          {replace ? `New ${section} Section` : `Add new ${section} section`}
        </button>
      </div> */}
    </div>
  );
}

export default ListOfKinds;
