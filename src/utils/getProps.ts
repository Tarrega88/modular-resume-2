import { Kinds } from "@/state/types";

//todo 9/14/2025: consider tweaking how UserLinks are handled in generation - right now there's no way to create a new one

import { PrevJobProps, BulletPointProps, UserInfoProps, EducationProps, SkillProps, SectionHeaderProps, SummaryProps, ProjectProps } from "@/state/types";

export function getPrevJobProps(id: string): PrevJobProps {
    return {
        id, kind: "prevJob", companyName: "Company Name", jobTitle: "Job Title", location: "City, St", monthStarted: 0, yearStarted: 2000, monthEnded: 0, yearEnded: 2025
    }
}

export function getBulletPointProps(id: string): BulletPointProps {
    return { id, kind: "bulletPoint", text: "Enter bullet point or choose from dropdown..." }
}

export function getUserInfoProps(): UserInfoProps {
    return { fullName: "Full Name", showIcons: true, professionTitle: "Profession", showProfession: true, hasUnderline: true, kind: "userInfo", email: "email@gmail.com", phoneNumber: "(123) 456-7890", location: "City, ST", userLink1: "0", userLink2: "1", showLink1: true, showLink2: true }
}

export function getEducationProps(id: string): EducationProps {
    return { id, kind: "education", monthEnded: 0, yearEnded: 2025, schoolName: "University Name", degree: "Degree, Honors, GPA" }
}

export function getSkillProps(id: string): SkillProps {
    return { id, kind: "skill", list: ["List skills here and separate them with commas"], showCategory: true, category: "Category" }
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

