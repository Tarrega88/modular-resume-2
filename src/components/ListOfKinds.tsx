import {
  addBulletData,
  addEducationData,
  addPrevJobData,
  addProjectData,
  addResumeItemAt,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  addUserInfoData,
  addUserLink,
} from "@/state/resumeSlice";
import { Kinds } from "@/state/types";
import {
  getBulletPointProps,
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
  { title: "Experience", kind: "prevJob" },
  { title: "Education", kind: "education" },
  { title: "Bullet", kind: "bulletPoint" },
  { title: "List", kind: "skill" },
  { title: "Contact", kind: "userInfo" },
  { title: "Header", kind: "userInfo" },
  { title: "Text Block", kind: "summary" },
  { title: "Project", kind: "project" },
];
function ListOfKinds({
  renderIndex,
  setIsExpanded,
}: {
  renderIndex: number;
  setIsExpanded(e: boolean): void;
}) {
  const dispatch = useDispatch();
  function handleAddNewSection(section: { title: string; kind: Kinds }) {
    const newId = crypto.randomUUID();
    switch (section.title) {
      case "Experience":
        const experienceData = getPrevJobProps(newId);
        dispatch(addPrevJobData(experienceData));
        break;
      case "Education":
        const educationData = getEducationProps(newId);
        dispatch(addEducationData(educationData));
        break;
      case "Bullet":
        const bulletData = getBulletPointProps(newId);
        dispatch(addBulletData(bulletData));
        break;
      case "List":
        const listData = getSkillProps(newId);
        dispatch(addSkillData(listData));
        break;
      case "Contact":
        const userInfoData = getUserInfoProps(newId);
        const { userLink1, userLink2 } = userInfoData;
        dispatch(addUserLink(userLink1));
        dispatch(addUserLink(userLink2));
        dispatch(addUserInfoData(userInfoData));
        break;
      case "Header":
        const headerData = getSectionHeaderProps(newId);
        dispatch(addSectionHeaderData(headerData));
        break;
      case "Text Block":
        const textBlockData = getSummaryProps(newId);
        dispatch(addSummaryData(textBlockData));
        break;
      case "Project":
        const projectData = getProjectProps(newId);
        const userLinkId = projectData.website;
        dispatch(addUserLink(userLinkId));
        dispatch(addProjectData(projectData));
        break;
    }

    dispatch(
      addResumeItemAt({
        renderIndex,
        data: { id: crypto.randomUUID(), kind: section.kind, elementId: newId },
      })
    );
    setIsExpanded(false);
  }

  return (
    <div>
      <div className="px-4 bg-slate-800 text-slate-50 pb-1">
        Or start with a default:
      </div>
      <div className="px-1 flex gap-3 justify-center bg-slate-400 py-2">
        {sections.map((e: { title: string; kind: Kinds }, i) => (
          <div className="" key={i}>
            <button
              className="bg-slate-700 hover:bg-slate-800 text-slate-100 h-10 rounded-sm w-max px-1 cursor-pointer transition-all duration-200"
              onClick={() => handleAddNewSection(e)}
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
