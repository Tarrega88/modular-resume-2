import { PayloadAction } from "@reduxjs/toolkit";
export type ID = string;
export type PrevJobEditable = Omit<PrevJobProps, "id" | "kind">;
export type PrevJobKey = keyof PrevJobEditable;

export type Kinds = "prevJob" | "education" | "bulletPoint" | "skill" | "userInfo" | "sectionHeader" | "summary";

export type UserInfoProps = {
    fullName: string;
    showIcons: boolean;
    professionTitle: string;
    showProfession: boolean;
    hasUnderline: boolean;
    kind: "userInfo";
    email: string;
    phoneNumber: string;
    location: string;
    userLink1: string;
    userLink2: string;
    showLink1: boolean;
    showLink2: boolean;
}

export type ResumeItemProps = {
    id: ID;
    kind: Kinds;
    elementId: ID;
}

export type TextEdit = PayloadAction<{ id: string; text: string; }>
export type JobSectionTextEdit = PayloadAction<{ id: string; text: string; field: "jobTitle" | "location" | "companyName"; }>

//Note 9/11/2025: Consider whether UserLinkProps should have kind prop
export type UserLinkData = {
    id: string;
    text: string;
    url: string;
}

export type SummaryProps = {
    id: string;
    kind: "summary";
    text: string;
}

export type PrevJobProps = {
    id: string;
    kind: "prevJob";
    companyName: string;
    jobTitle: string;
    location: string;
    monthStarted: number;
    yearStarted: number;
    monthEnded: number;
    yearEnded: number;
};

export type BulletPointProps = { id: string; kind: "bulletPoint"; text: string; };

export type EducationProps = {
    id: string;
    kind: "education";
    schoolName: string;
    degree: string;
    monthEnded: number;
    yearEnded: number;
};

export type SectionHeaderProps = {
    id: string;
    text: string;
    kind: "sectionHeader";
    underline: boolean;
}

export type SkillProps = {
    id: string;
    kind: "skill";
    list: string[];
    showCategory: boolean;
    category: string;
}

export type ProjectProps = {
    id: string;
    kind: "project";
    title: string;
    description: string;
    hasWebsite: boolean;
    website: UserLinkData;
}

export type ResumeState = {
    scale: number;
    currentResumeId: string;
    dragFromIndex: number;
    dragToIndex: number;
    dragHigher: boolean;
    monthType: "short" | "long",
    data: {
        userInfo: UserInfoProps,
        userLinks: Record<ID, UserLinkData>;
        summaries: Record<ID, SummaryProps>;
        sectionHeaders: Record<ID, SectionHeaderProps>;
        prevJobs: Record<ID, PrevJobProps>;
        bulletPoints: Record<ID, BulletPointProps>;
        education: Record<ID, EducationProps>;
        projects: Record<ID, ProjectProps>;
        skills: Record<ID, SkillProps>;
    };
    resumes: Record<ID, ResumeItemProps[]>;
}