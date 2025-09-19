import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { BulletPointProps, DividerProps, EducationProps, ID, Kinds, PrevJobEditable, PrevJobKey, PrevJobProps, ProjectProps, ResumeItemProps, ResumeMetaDataProps, ResumeState, SectionHeaderProps, SkillProps, SummaryProps, TextEdit, UserInfoProps } from "./types";
import { formatDate } from "@/utils/formatDate";

function setField<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    (obj as Record<K, T[K]>)[key] = value; //obj as any is an option for testing
}

//TODO 9/16/2025: look into whether or not this is still needed, along with the two defaults
function ensurePrevJob(state: ResumeState, id: ID): PrevJobProps {
    return (state.data.prevJobs[id] ??= { ...prevJobDefault, id });
}

export const locationDefault: string = "City, ST";
export const prevJobDefault: PrevJobProps = { id: "0", kind: "prevJob", companyName: "Company Name", location: locationDefault, jobTitle: "Job Title", monthStarted: 0, yearStarted: 2024, monthEnded: 11, yearEnded: 2025 }

const initialState: ResumeState = {
    resumeMetaData: {},
    showDividers: true,
    overlayMarginGuides: false,
    scale: 100,
    dropdownIsReplace: true,
    currentResumeId: "",
    dragFromIndex: -1,
    dragToIndex: -1,
    dragHigher: true,
    monthType: "short",
    data: {
        userInfo: {},
        userLinks: {},
        summaries: {},
        sectionHeaders: {},
        prevJobs: {},
        bulletPoints: {},
        education: {},
        projects: {},
        skills: {},
        dividers: {},
    },

    resumes: {},
};

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        hydrate(_state, action: PayloadAction<ResumeState>) {
            return action.payload;
        },
        setCurrentResume(state, action: PayloadAction<string>) {
            state.currentResumeId = action.payload;
        },
        createEmptyResume(state) {
            const { currentResumeId } = state;
            state.resumes[currentResumeId] = [];
        },
        replaceResumeItem(state, action: PayloadAction<{ renderIndex: number; data: ResumeItemProps }>) {
            const { renderIndex, data } = action.payload;
            const currentResume = state.currentResumeId;
            state.resumes[currentResume].splice(renderIndex, 1, data);
        },
        addResumeItemAt(state, action: PayloadAction<{ renderIndex: number; data: ResumeItemProps }>) {
            const { renderIndex, data } = action.payload;
            const { currentResumeId } = state;
            state.resumes[currentResumeId].splice(renderIndex + 1, 0, data);

        },
        addResumeItem(state, action: PayloadAction<{ kind: Kinds, elementId: string | null }>) {
            const { currentResumeId } = state;
            const { kind, elementId } = action.payload;
            //Note: May consider removing the null check and instead making elementId optional, but this is probably safer
            if (elementId === null) {
                state.resumes[currentResumeId].push({ id: crypto.randomUUID(), kind, elementId: crypto.randomUUID() })
            } else {
                state.resumes[currentResumeId].push({ id: crypto.randomUUID(), kind, elementId })
            }

        },
        addUserInfoData(state, action: PayloadAction<UserInfoProps>) {
            const { id } = action.payload;
            state.data.userInfo[id] = action.payload;
        },
        addBulletData(state, action: PayloadAction<BulletPointProps>) {
            const { id } = action.payload;
            state.data.bulletPoints[id] = action.payload;
        },
        updatePrevJobField(
            state,
            action: PayloadAction<{ id: ID; field: PrevJobKey; value: PrevJobEditable[PrevJobKey] }>
        ) {
            const { id, field, value } = action.payload;
            const job = ensurePrevJob(state, id);
            setField(job, field, value);
        },
        addPrevJobData(state, action: PayloadAction<PrevJobProps>) {
            const { id } = action.payload;
            state.data.prevJobs[id] = action.payload;
        },
        addEducationData(state, action: PayloadAction<EducationProps>) {
            const { id } = action.payload;
            state.data.education[id] = action.payload;
        },
        addSkillData(state, action: PayloadAction<SkillProps>) {
            const { id } = action.payload;
            state.data.skills[id] = action.payload;
        },
        addSectionHeaderData(state, action: PayloadAction<SectionHeaderProps>) {
            const { id } = action.payload;
            state.data.sectionHeaders[id] = action.payload;
        },
        addSummaryData(state, action: PayloadAction<SummaryProps>) {
            const { id } = action.payload;
            state.data.summaries[id] = action.payload;
        },
        addProjectData(state, action: PayloadAction<ProjectProps>) {
            const { id } = action.payload;
            // const userLinkId = crypto.randomUUID();
            // state.data.userLinks[userLinkId] = { id: userLinkId, text: "Link Name", url: "URL" };
            // getProjectProps(id);
            // const newProjectData: ProjectProps = { id, kind: "project", title:   }
            state.data.projects[id] = action.payload;
        },
        addDividerData(state, action: PayloadAction<DividerProps>) {
            const { id } = action.payload;
            state.data.dividers[id] = action.payload;
        },
        editBulletPoint(state, action: TextEdit) {
            const { id, text } = action.payload;
            if (id in state.data.bulletPoints) {
                state.data.bulletPoints[id].text = text;
            } else {
                state.data.bulletPoints[id] = { id, kind: "bulletPoint", text }
            }
        },
        changeBulletPoint(state, action: PayloadAction<{ renderIndex: number; id: string; }>) {
            const currentResume = state.currentResumeId;
            const { renderIndex, id } = action.payload;
            state.resumes[currentResume][renderIndex] = { id: crypto.randomUUID(), kind: "bulletPoint", elementId: id }
        },
        removeResumeItem(state, action: PayloadAction<{ renderIndex: number }>) {
            const { renderIndex } = action.payload;
            const currentResume = state.currentResumeId;
            state.resumes[currentResume].splice(renderIndex, 1);
        },
        setDragFromIndex(state, action: PayloadAction<number>) {
            state.dragFromIndex = action.payload;
        },
        setDragToIndex(state, action: PayloadAction<number>) {
            state.dragToIndex = action.payload;
        },
        dragResumeItem(state) {
            const { dragToIndex: toIndex, dragFromIndex: fromIndex, currentResumeId } = state;
            if (toIndex === -1 || fromIndex === toIndex) return;

            const arr = state.resumes[currentResumeId];
            const [item] = arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
        },
        setDragHigher(state, action: PayloadAction<boolean>) {
            state.dragHigher = action.payload;
        },
        editSectionHeader(state, action: PayloadAction<{ id: string; text: string; }>) {
            const { id, text } = action.payload;
            state.data.sectionHeaders[id].text = text;
        },
        toggleSectionHeaderUnderline(state, action: PayloadAction<{ id: string; underline: boolean; }>) {
            const { id, underline } = action.payload;
            state.data.sectionHeaders[id].underline = underline;
        },
        editSummary(state, action: PayloadAction<{ id: string; text: string; }>) {
            const { id, text } = action.payload;
            state.data.summaries[id].text = text;
        },
        setScale(state, action: PayloadAction<number>) {
            state.scale = action.payload;
        },
        editUserInfo(state, action: PayloadAction<{ id: string; field: keyof UserInfoProps; text: string; }>) {
            const { id, field, text } = action.payload;
            if (field !== "kind" && field !== "userLink1" && field !== "userLink2" && field !== "showLink1" && field !== "showLink2" && field !== "showProfession" && field !== "hasUnderline" && field !== "showIcons") state.data.userInfo[id][field] = text;
        },
        toggleUserBool(state, action: PayloadAction<{ id: string; field: "showLink1" | "showLink2" | "hasUnderline" | "showProfession" | "showIcons", show: boolean }>) {
            const { id, field, show } = action.payload;
            state.data.userInfo[id][field] = show;
        },
        editSkills(state, action: PayloadAction<{ id: string; text: string }>) {
            const { id, text } = action.payload;
            state.data.skills[id].list = text.split(",").filter(e => e.length > 1).map(e => e.trim());
        },
        dragSkill(state, action: PayloadAction<{ fromIndex: number, toIndex: number; id: string }>) {
            const { fromIndex, toIndex, id } = action.payload;

            if (toIndex === -1 || fromIndex === toIndex) return;
            const arr = state.data.skills[id].list;
            const [item] = arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
        },
        editSkillCategory(state, action: PayloadAction<{ id: string; text: string; }>) {
            const { id, text } = action.payload;
            if (text.length <= 1) {
                state.data.skills[id].showCategory = false;
                state.data.skills[id].category = "Category";
            } else {
                let sanitizedText = text.trim();
                sanitizedText = sanitizedText[sanitizedText.length - 1] === ":" ? sanitizedText.slice(0, -1) : sanitizedText;
                state.data.skills[id].category = sanitizedText;
            }
        },
        setShowCategory(state, action: PayloadAction<{ id: string; showCategory: boolean }>) {
            const { id, showCategory } = action.payload;
            state.data.skills[id].showCategory = showCategory;
        },
        duplicateSection(state, action: PayloadAction<{ kind: Kinds, index: number, elementId: string; }>) {
            const { currentResumeId } = state;
            const { kind, index, elementId } = action.payload;
            const id = crypto.randomUUID();

            state.resumes[currentResumeId].splice(index + 1, 0, { kind, id, elementId });
        },
        editUserLink(state, action: PayloadAction<{ id: string; text: string; url: string; }>) {
            const { id, text, url } = action.payload;
            state.data.userLinks[id].text = text;
            state.data.userLinks[id].url = url;
        },
        editEducationDate(state, action: PayloadAction<{ id: string; field: "monthEnded" | "yearEnded"; value: number }>) {
            const { id, value, field } = action.payload;

            state.data.education[id][field] = value;
        },
        editEducationString(state, action: PayloadAction<{ id: string; field: "schoolName" | "degree", text: string; }>) {
            const { id, text, field } = action.payload;
            state.data.education[id][field] = text;
        },
        editProjectString(state, action: PayloadAction<{ id: string; field: "title" | "description"; text: string; }>) {
            const { id, field, text } = action.payload;
            state.data.projects[id][field] = text;
        },
        editProjectBool(state, action: PayloadAction<{ id: string; bool: boolean, field: "hasWebsite" }>) {
            const { id, bool, field } = action.payload;
            state.data.projects[id][field] = bool;
        },
        addUserLink(state, action: PayloadAction<string>) {
            state.data.userLinks[action.payload] = { id: action.payload, text: "Link Name", url: "URL" };
        },
        copyResume(state, action: PayloadAction<{ originalId: string; newId: string; }>) {
            const { originalId, newId } = action.payload;
            state.resumes[newId] = [];
            const now = formatDate(new Date(Date.now()));

            const originalName = state.resumeMetaData[originalId].resumeName;
            const originalTime = state.resumeMetaData[originalId].createdAt;
            const newName = originalName.length && !originalName.includes("Copy") ? `Copy of ${originalName}` : `Copy of resume created on ${(originalTime)}`

            state.resumeMetaData[newId] = {
                resumeName: newName, resumeId: newId, createdAt: now,
            }

            for (const item of state.resumes[originalId]) {
                state.resumes[newId].push(item);
            }
        },
        editDividerNumber(state, action: PayloadAction<{ id: string; field: string; val: number; }>) {
            const { id, field, val } = action.payload;
            state.data.dividers[id][field] = val;
        },
        toggleDropdownIsReplace(state, action: PayloadAction<boolean>) {
            state.dropdownIsReplace = action.payload;
        },
        toggleShowDividers(state, action: PayloadAction<boolean>) {
            state.showDividers = action.payload;
        },
        toggleOverlayMarginGuides(state, action: PayloadAction<boolean>) {
            state.overlayMarginGuides = action.payload;
        },
        changeResumeName(state, action: PayloadAction<string>) {
            const { currentResumeId } = state;
            state.resumeMetaData[currentResumeId].resumeName = action.payload;
        },
        generateMetaData(state, action: PayloadAction<string>) {
            const now = new Date(Date.now());

            state.resumeMetaData[action.payload] = {
                resumeName: "", resumeId: action.payload, createdAt: formatDate(now),
            }
        },
        changeMonthType(state, action: PayloadAction<"short" | "long">) {
            state.monthType = action.payload;
        },
        deleteResume(state, action: PayloadAction<string>) {
            const id = action.payload;
            delete state.resumeMetaData[id];
            delete state.resumes[id];
        }

    },
});

export const { hydrate, setCurrentResume, editBulletPoint, changeBulletPoint, removeResumeItem, setDragToIndex, setDragFromIndex, dragResumeItem, setDragHigher, addResumeItem, addBulletData, addEducationData, addPrevJobData, createEmptyResume, updatePrevJobField, setScale, editUserInfo, editSkills, dragSkill, editSkillCategory, setShowCategory, editSectionHeader, addSkillData, duplicateSection, addSectionHeaderData, addSummaryData, editSummary, editUserLink, toggleUserBool, toggleSectionHeaderUnderline, editEducationDate, editEducationString, addUserLink, copyResume, addProjectData, editProjectString, editProjectBool, replaceResumeItem, addUserInfoData, addResumeItemAt, editDividerNumber, addDividerData, toggleDropdownIsReplace, toggleOverlayMarginGuides, toggleShowDividers, changeResumeName, generateMetaData, changeMonthType, deleteResume } = resumeSlice.actions;
export default resumeSlice.reducer;