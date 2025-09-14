import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BulletPointProps, EducationProps, ID, Kinds, PrevJobEditable, PrevJobKey, PrevJobProps, ResumeState, SectionHeaderProps, SkillProps, SummaryProps, TextEdit, UserInfoProps } from "./types";

function setField<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    (obj as Record<K, T[K]>)[key] = value; //obj as any is an option for testing
}

function ensurePrevJob(state: ResumeState, id: ID): PrevJobProps {
    return (state.data.prevJobs[id] ??= { ...prevJobDefault, id });
}

export const locationDefault: string = "City, ST";
export const prevJobDefault: PrevJobProps = { id: "0", kind: "prevJob", companyName: "Company Name", location: locationDefault, jobTitle: "Job Title", monthStarted: 0, yearStarted: 2024, monthEnded: 11, yearEnded: 2025 }
// export const personalInfoDefault: PersonalInfoProps = { id: "0", kind: "personalInfo", fullName: "Full Name", email: "email@email.com", phoneNumber: "(123) 456-7890", location: locationDefault }
export const bulletPointDefault: BulletPointProps = { id: "0", kind: "bulletPoint", text: "Enter Bullet Point Text Here" }

//data will store all data across multiple resumes - might add a "hidden" boolean to everything,
//which would start as false, but the user could mark anything to be hidden from not being an option to pick for that resume.

//NOTE: id and object key will match except in the resumes object.

// /state/resumeSlice.ts
const initialState: ResumeState = {
    scale: 100,              // unscaled preview
    currentResumeId: "",         // set by setCurrentResume(...) on route mount
    dragFromIndex: -1,
    dragToIndex: -1,
    dragHigher: true,
    monthType: "short",

    data: {
        userInfo: {
            fullName: "",
            professionTitle: "",
            showProfession: false,
            showIcons: true,
            hasUnderline: true,
            kind: "userInfo",
            email: "",
            phoneNumber: "",
            location: "",
            userLink1: "0",
            userLink2: "1",
            showLink1: false,
            showLink2: false,
        },

        // keep two empty link slots so IDs referenced above exist
        userLinks: {
            "0": { id: "0", text: "", url: "" },
            "1": { id: "1", text: "", url: "" },
        },

        summaries: {},
        sectionHeaders: {},
        prevJobs: {},
        bulletPoints: {},
        education: {},
        projects: {},
        skills: {},
    },

    // no resumes yet; create on demand or guard when reading
    resumes: {},
};


// const initialState: ResumeState = {
//     scale: 75,
//     currentResumeId: "0",
//     dragFromIndex: -1,
//     dragToIndex: -1,
//     dragHigher: true,
//     monthType: "short", //TODO 9/6/2025: store monthTypes in a "per resume" type of object
//     data: {
//         userInfo: {
//             fullName: "Michael",
//             showIcons: true,
//             professionTitle: "Software Developer",
//             showProfession: true,
//             hasUnderline: true,
//             kind: "userInfo",
//             email: "email@gmail.com",
//             phoneNumber: "(123) 456-7890",
//             location: "City, ST",
//             userLink1: "0",
//             userLink2: "1",
//             showLink1: false,
//             showLink2: false,
//         },
//         summaries: {
//             0: {
//                 id: "0", kind: "summary", text: `Results-driven professional with a proven ability to adapt quickly, solve problems, and contribute effectively in collaborative environments. Skilled at learning new technologies, managing multiple priorities, and delivering high-quality work under deadlines.`
//             }
//         },
//         sectionHeaders: {
//             0: { id: "0", kind: "sectionHeader", text: "EXPERIENCE", underline: true },
//             1: { id: "1", kind: "sectionHeader", text: "SKILLS", underline: true },
//             2: { id: "2", kind: "sectionHeader", text: "SUMMARY", underline: true },
//             3: { id: "3", kind: "sectionHeader", text: "EDUCATION", underline: true }
//         },
//         prevJobs: {
//             0: { id: "0", kind: "prevJob", companyName: "Google", location: "Anchorage, AK", jobTitle: "Software Developer", monthStarted: 6, yearStarted: 2023, monthEnded: 11, yearEnded: 2024 },
//             1: { id: "1", kind: "prevJob", companyName: "Microsoft", location: "Los Angeles, CA", jobTitle: "UI/UX Designer", monthStarted: 0, yearStarted: 2022, monthEnded: 5, yearEnded: 2023 },
//             // 2: { id: "2", kind: "prevJob", companyName: "Best Buy", location: "Los Angeles, CA", jobTitle: "Customer Support", monthStarted: 0, yearStarted: 2022, monthEnded: 5, yearEnded: 2023 }
//         },
//         bulletPoints: {
//             0: { id: "0", kind: "bulletPoint", text: "Built software for ABC company" },
//             1: { id: "1", kind: "bulletPoint", text: "Developed an internal application to reduce user friction" },
//             2: { id: "2", kind: "bulletPoint", text: "Wrote and used automated tests in Jest" },
//             3: { id: "3", kind: "bulletPoint", text: "Collaborated with cross-functional teams to launch new features" },
//             4: { id: "4", kind: "bulletPoint", text: "Optimized React components for faster load times" },
//             5: { id: "5", kind: "bulletPoint", text: "Created RESTful APIs to support front-end functionality" },
//             6: { id: "6", kind: "bulletPoint", text: "Implemented Redux for scalable state management" },
//             7: { id: "7", kind: "bulletPoint", text: "Reviewed code and mentored junior developers" },
//             8: { id: "8", kind: "bulletPoint", text: "Integrated third-party authentication services" },
//             9: { id: "9", kind: "bulletPoint", text: "Designed responsive UI components using Tailwind CSS" },

//         },
//         education: {
//             0: {
//                 id: "0", kind: "education", schoolName: "University of Alaska Anchorage", degree: "B.A. in Music Education and Classical Guitar", monthEnded: 4, yearEnded: 2016
//             }
//         },
//         projects: {},
//         skills: { 0: { id: "0", kind: "skill", list: ["JavaScript", "TypeScript", "HTML", "CSS"], showCategory: true, category: "Technology" }, 1: { id: "1", kind: "skill", list: ["Docker", "VSCode", "Excel", "Word"], showCategory: true, category: "Software" } },
//         //Note: userLinks should remain hardcoded in with at least 0 and 1 at all times.
//         userLinks: { 0: { id: "0", text: "", url: "" }, 1: { id: "1", text: "", url: "" } },
//     },
//     resumes: {
//         0: [{ id: "99", kind: "userInfo", elementId: "" },
//         // { id: "97", kind: "sectionHeader", elementId: "2" },
//         { id: "96", kind: "summary", elementId: "0" },
//         { id: "98", kind: "sectionHeader", elementId: "0" },
//         { id: "100", kind: "prevJob", elementId: "0" },

//         { id: "101", kind: "bulletPoint", elementId: "0" },
//         { id: "102", kind: "bulletPoint", elementId: "1" },
//         { id: "103", kind: "bulletPoint", elementId: "2" },

//         { id: "104", kind: "prevJob", elementId: "1" },
//         { id: "105", kind: "bulletPoint", elementId: "3" },
//         { id: "106", kind: "bulletPoint", elementId: "4" },
//         { id: "107", kind: "bulletPoint", elementId: "5" },
//         { id: "111", kind: "sectionHeader", elementId: "3" },
//         { id: "112", kind: "education", elementId: "0" },
//         { id: "108", kind: "sectionHeader", elementId: "1" },
//         { id: "109", kind: "skill", elementId: "0" },
//         { id: "110", kind: "skill", elementId: "1" },


//         { id: "108", kind: "prevJob", elementId: "2" },
//         { id: "109", kind: "bulletPoint", elementId: "6" },
//         { id: "110", kind: "bulletPoint", elementId: "7" },
//         { id: "111", kind: "bulletPoint", elementId: "8" },

//         { id: "112", kind: "prevJob", elementId: "0" },
//         { id: "113", kind: "bulletPoint", elementId: "9" },
//         ],
//     },

// };
//.data.bulletPoints

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setCurrentResume(state, action: PayloadAction<string>) {
            state.currentResumeId = action.payload;
        },
        createEmptyResume(state) {
            const { currentResumeId } = state;
            state.resumes[currentResumeId] = [];
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
        editUserInfo(state, action: PayloadAction<{ field: keyof UserInfoProps; text: string; }>) {
            const { field, text } = action.payload;
            if (field !== "kind" && field !== "userLink1" && field !== "userLink2" && field !== "showLink1" && field !== "showLink2" && field !== "showProfession" && field !== "hasUnderline" && field !== "showIcons") state.data.userInfo[field] = text;
        },
        toggleUserBool(state, action: PayloadAction<{ field: "showLink1" | "showLink2" | "hasUnderline" | "showProfession" | "showIcons", show: boolean }>) {
            const { field, show } = action.payload;
            state.data.userInfo[field] = show;
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

            state.resumes[currentResumeId].splice(index, 0, { kind, id, elementId });
            // state.resumes[currentResumeId] = [...state.resumes[currentResumeId]]
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
        hydrate(_state, action: PayloadAction<ResumeState>) {
            return action.payload;
        },


    },
});

export const { hydrate, setCurrentResume, editBulletPoint, changeBulletPoint, removeResumeItem, setDragToIndex, setDragFromIndex, dragResumeItem, setDragHigher, addResumeItem, addBulletData, addEducationData, addPrevJobData, createEmptyResume, updatePrevJobField, setScale, editUserInfo, editSkills, dragSkill, editSkillCategory, setShowCategory, editSectionHeader, addSkillData, duplicateSection, addSectionHeaderData, addSummaryData, editSummary, editUserLink, toggleUserBool, toggleSectionHeaderUnderline, editEducationDate, editEducationString } = resumeSlice.actions;
export default resumeSlice.reducer;
