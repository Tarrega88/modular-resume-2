import { Kinds } from "@/state/types";

const sections = [
  { title: "Bullet", kind: "bulletPoint" },
  { title: "Divider", kind: "divider" },
  { title: "Education", kind: "education" },
  { title: "Experience", kind: "prevJob" },
  { title: "Header", kind: "sectionHeader" },
  { title: "Info", kind: "userInfo" },
  { title: "List", kind: "skill" },
  { title: "Project", kind: "project" },
  { title: "Text", kind: "summary" },
];

type Props = {
  kind: Kinds;
  setKind(e: Kinds): void;
};
function ListOfKinds({ setKind, kind }: Props) {
  return (
    <div>
      <div className="px-1 flex gap-3 justify-center bg-slate-400 py-2 flex-wrap">
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
    </div>
  );
}

export default ListOfKinds;
