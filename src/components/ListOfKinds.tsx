import {
  addBulletData,
  addDividerData,
  addEducationData,
  addPrevJobData,
  addProjectData,
  addResumeItemAt,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  addUserInfoData,
  addUserLink,
  replaceResumeItem,
} from "@/state/resumeSlice";
import { Kinds } from "@/state/types";
import {
  getBulletPointProps,
  getDividerProps,
  getEducationProps,
  getPrevJobProps,
  getProjectProps,
  getSectionHeaderProps,
  getSkillProps,
  getSummaryProps,
  getUserInfoProps,
} from "@/utils/getProps";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  function handleAddNewSection(kind: Kinds) {
    const newId = crypto.randomUUID();
    switch (kind) {
      case "prevJob":
        const experienceData = getPrevJobProps(newId);
        dispatch(addPrevJobData(experienceData));
        break;
      case "education":
        const educationData = getEducationProps(newId);
        dispatch(addEducationData(educationData));
        break;
      case "bulletPoint":
        const bulletData = getBulletPointProps(newId);
        dispatch(addBulletData(bulletData));
        break;
      case "skill":
        const listData = getSkillProps(newId);
        dispatch(addSkillData(listData));
        break;
      case "userInfo":
        const userInfoData = getUserInfoProps(newId);
        const { userLink1, userLink2 } = userInfoData;
        dispatch(addUserLink(userLink1));
        dispatch(addUserLink(userLink2));
        dispatch(addUserInfoData(userInfoData));
        break;
      case "sectionHeader":
        const headerData = getSectionHeaderProps(newId);
        dispatch(addSectionHeaderData(headerData));
        break;
      case "summary":
        const textBlockData = getSummaryProps(newId);
        dispatch(addSummaryData(textBlockData));
        break;
      case "project":
        const projectData = getProjectProps(newId);
        const userLinkId = projectData.website;
        dispatch(addUserLink(userLinkId));
        dispatch(addProjectData(projectData));
        break;
      case "divider":
        const dividerData = getDividerProps(newId);
        dispatch(addDividerData(dividerData));
    }

    if (replace) {
      dispatch(
        replaceResumeItem({
          renderIndex,
          data: {
            id: crypto.randomUUID(),
            kind,
            elementId: newId,
          },
        })
      );
    } else {
      dispatch(
        addResumeItemAt({
          renderIndex,
          data: {
            id: crypto.randomUUID(),
            kind,
            elementId: newId,
          },
        })
      );
    }
    setIsExpanded(false);
  }

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
