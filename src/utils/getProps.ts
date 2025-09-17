import { Kinds } from "@/state/types";

//todo 9/14/2025: consider tweaking how UserLinks are handled in generation - right now there's no way to create a new one

import { PrevJobProps, BulletPointProps, UserInfoProps, EducationProps, SkillProps, SectionHeaderProps, SummaryProps, ProjectProps } from "@/state/types";


export function getUserInfoProps(id: string): UserInfoProps {
    const userLinkId1 = crypto.randomUUID();
    const userLinkId2 = crypto.randomUUID();
    return { id, fullName: "Full Name", showIcons: true, professionTitle: "Profession", showProfession: true, hasUnderline: true, kind: "userInfo", email: "email@gmail.com", phoneNumber: "(123) 456-7890", location: "City, ST", userLink1: userLinkId1, userLink2: userLinkId2, showLink1: true, showLink2: true }
}

export function getPrevJobProps(id: string): PrevJobProps {
    return {
        id, kind: "prevJob", companyName: "Company Name", jobTitle: "Job Title", location: "City, St", monthStarted: 0, yearStarted: 2000, monthEnded: 0, yearEnded: 2025
    }
}

export function getBulletPointProps(id: string): BulletPointProps {
    return { id, kind: "bulletPoint", text: "Enter bullet point..." }
}

export function getEducationProps(id: string): EducationProps {
    return { id, kind: "education", monthEnded: 0, yearEnded: 2025, schoolName: "University Name", degree: "Degree, Honors, GPA" }
}

export function getSkillProps(id: string): SkillProps {
    return { id, kind: "skill", list: ["Separate items in the list with commas"], showCategory: true, category: "Category" }
}

export function getSectionHeaderProps(id: string): SectionHeaderProps {
    return { id, text: "Section Header", kind: "sectionHeader", underline: true }
}

export function getSummaryProps(id: string): SummaryProps {
    return { id, kind: "summary", text: "Enter summary text..." }
}

export function getProjectProps(id: string): ProjectProps {
    const newUserLinkId = crypto.randomUUID();
    return { id, kind: "project", title: "Project Name", description: "Description of project", hasWebsite: true, website: newUserLinkId }
}


export function getFilterPlaceholders(kind: Kinds) {
    switch (kind) {
        case "bulletPoint":
            const { text } = getBulletPointProps("");
            return { text };
        case "education":
            const { degree, schoolName } = getEducationProps("");
            return { degree, schoolName };
        case "prevJob":
            const { companyName, jobTitle, location } = getPrevJobProps("");
            return { companyName, jobTitle, location };
        case "project":
            const { description, title } = getProjectProps("");
            return { description, title };
        case "sectionHeader":
            const sectionHeaderData = getSectionHeaderProps("");
            return { text: sectionHeaderData.text };
        case "skill":
            const { list } = getSkillProps("");
            return { list };
        case "summary":
            const summaryData = getSummaryProps("");
            return { text: summaryData.text };
        case "userInfo":
            const userInfoData = getUserInfoProps("");
            return {
                fullName: userInfoData.fullName,
                email: userInfoData.email,
                location: userInfoData.location,
                phoneNumber: userInfoData.phoneNumber,
                professionTitle: userInfoData.professionTitle,
            };
    }
}