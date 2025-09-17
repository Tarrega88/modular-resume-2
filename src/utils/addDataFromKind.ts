import { Kinds } from "@/state/types";
import { getBulletPointProps, getDividerProps, getEducationProps, getPrevJobProps, getProjectProps, getSectionHeaderProps, getSkillProps, getSummaryProps, getUserInfoProps } from "./getProps";
import { addBulletData, addDividerData, addEducationData, addPrevJobData, addProjectData, addSectionHeaderData, addSkillData, addSummaryData, addUserInfoData, addUserLink } from "@/state/resumeSlice";

export default function addDataFromKind(kind: Kinds, dispatch: any) {
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
    return newId;
}