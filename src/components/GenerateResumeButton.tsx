import { useDispatch } from "react-redux";
import {
  addBulletData,
  addDividerData,
  addEducationData,
  addPrevJobData,
  addProjectData,
  addResumeItem,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  addUserInfoData,
  addUserLink,
  createEmptyResume,
  generateMetaData,
  setCurrentResume,
} from "../state/resumeSlice";
import { Kinds } from "../state/types";
import { useNavigate } from "react-router-dom";
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
import { makeId } from "@/utils/makeId";

type RenderProps = {
  kind: Kinds;
  text?: string;
};

const newResumeRenderItems: RenderProps[] = [
  { kind: "divider" },
  { kind: "userInfo" },
  { kind: "summary" },
  { kind: "sectionHeader", text: "Experience" },
  { kind: "prevJob" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "prevJob" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "prevJob" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "sectionHeader", text: "Education" },
  { kind: "education" },
  { kind: "sectionHeader", text: "Skills" },
  { kind: "skill" },
  { kind: "sectionHeader", text: "Projects" },
  { kind: "project" },
];

export default function GenerateResumeButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    const newResumeId = makeId();

    dispatch(setCurrentResume(newResumeId));
    dispatch(generateMetaData(newResumeId));
    dispatch(createEmptyResume());

    for (const item of newResumeRenderItems) {
      const kind = item.kind;
      const id = makeId();

      switch (kind) {
        case "userInfo":
          const userInfoData = getUserInfoProps(id);
          const { userLink1, userLink2 } = userInfoData;
          dispatch(addUserLink(userLink1));
          dispatch(addUserLink(userLink2));
          dispatch(addUserInfoData(userInfoData));
          break;
        case "prevJob":
          dispatch(addPrevJobData(getPrevJobProps(id)));
          break;
        case "bulletPoint":
          dispatch(addBulletData(getBulletPointProps(id)));
          break;
        case "sectionHeader":
          const headerData = getSectionHeaderProps(id);
          headerData.text = item.text;
          dispatch(addSectionHeaderData(headerData));
          break;
        case "education":
          dispatch(addEducationData(getEducationProps(id)));
          break;
        case "skill":
          dispatch(addSkillData(getSkillProps(id)));
          break;
        case "summary":
          dispatch(addSummaryData(getSummaryProps(id)));
          break;
        case "project":
          const projectData = getProjectProps(id);
          const userLinkId = projectData.website;
          dispatch(addUserLink(userLinkId));
          dispatch(addProjectData(projectData));
          break;
        case "divider":
          dispatch(addDividerData(getDividerProps(id)));
          break;
      }

      dispatch(addResumeItem({ kind, elementId: id }));
    }

    navigate(`/builder/${newResumeId}`);
  }

  return (
    <button
      onTouchEnd={handleClick}
      onClick={handleClick}
      className="bg-emerald-600 shadow-lg text-white font-semibold px-3 py-1 rounded-sm outline-1 outline-emerald-100 hover:bg-emerald-500 transiton-all duration-200 cursor-pointer h-10"
    >
      Create New Resume
    </button>
  );
}
