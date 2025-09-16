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
import {
  addBulletData,
  addEducationData,
  addPrevJobData,
  addProjectData,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  addUserInfoData,
  addUserLink,
  duplicateSection,
} from "../state/resumeSlice";
import { Kinds } from "../state/types";
import { IoDuplicate } from "react-icons/io5";
import { useDispatch } from "react-redux";

function DuplicateButton({
  kind,
  renderIndex,
}: {
  kind: Kinds;
  renderIndex: number;
}) {
  // const dispatch = useDispatch();

  const dispatch = useDispatch();
  function handleDuplicate() {
    const id = crypto.randomUUID();

    switch (kind) {
      case "userInfo":
        const userInfoData = getUserInfoProps(id);
        const { userLink1, userLink2 } = userInfoData;
        dispatch(addUserLink(userLink1));
        dispatch(addUserLink(userLink2));
        dispatch(addUserInfoData(userInfoData));
        break;
      case "bulletPoint":
        dispatch(addBulletData(getBulletPointProps(id)));
        break;
      case "education":
        dispatch(addEducationData(getEducationProps(id)));
        break;
      case "prevJob":
        dispatch(addPrevJobData(getPrevJobProps(id)));
        break;
      case "skill":
        dispatch(addSkillData(getSkillProps(id)));
        break;
      case "sectionHeader":
        dispatch(addSectionHeaderData(getSectionHeaderProps(id)));
        break;
      case "summary":
        dispatch(addSummaryData(getSummaryProps(id)));
        break;
      case "project":
        const projectData = getProjectProps(id);
        const userLinkId = projectData.website;
        dispatch(addUserLink(userLinkId));
        dispatch(addProjectData(projectData));
    }

    dispatch(
      duplicateSection({
        kind,
        elementId: id,
        index: renderIndex,
      })
    );
  }

  return (
    <button
      onClick={handleDuplicate}
      className="text-xl cursor-pointer text-sky-600 transition-all duration-200 hover:text-sky-500"
    >
      <IoDuplicate />
    </button>
  );
}

export default DuplicateButton;
