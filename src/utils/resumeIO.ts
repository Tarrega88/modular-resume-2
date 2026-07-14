import { AppDispatch } from "@/state/store";
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
    changeResumeName,
    createEmptyResume,
    editFont,
    editFontScale,
    editMargin,
    editPageStyle,
    editUserLink,
    generateMetaData,
    setCurrentResume,
} from "@/state/resumeSlice";
import { makeId } from "@/utils/makeId";
import {
    BulletPointProps,
    DividerProps,
    EducationProps,
    ID,
    Kinds,
    PrevJobProps,
    ProjectProps,
    ResumeItemProps,
    ResumeState,
    SectionHeaderProps,
    SkillProps,
    SummaryProps,
    UserInfoProps,
    UserLinkData,
} from "@/state/types";

export const RESUME_EXPORT_VERSION = 1;

export type ResumeExportFile = {
    version: number;
    resumeMetaData: {
        resumeName: string;
        pageStyle: "Letter" | "A4";
        font: string;
        fontScale: number;
        margin: 50 | 75 | 100;
    };
    items: { kind: Kinds; elementId: ID }[];
    data: {
        userInfo: Record<ID, UserInfoProps>;
        userLinks: Record<ID, UserLinkData>;
        summaries: Record<ID, SummaryProps>;
        sectionHeaders: Record<ID, SectionHeaderProps>;
        prevJobs: Record<ID, PrevJobProps>;
        bulletPoints: Record<ID, BulletPointProps>;
        education: Record<ID, EducationProps>;
        projects: Record<ID, ProjectProps>;
        skills: Record<ID, SkillProps>;
        dividers: Record<ID, DividerProps>;
    };
};

function emptyExportData(): ResumeExportFile["data"] {
    return {
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
    };
}

// Builds a self-contained export of the currently active resume: its ordered
// list of items plus only the underlying data referenced by those items.
export function buildResumeExport(state: ResumeState): ResumeExportFile {
    const { currentResumeId, resumeMetaData, resumes, data } = state;
    const sourceItems: ResumeItemProps[] = resumes[currentResumeId] ?? [];
    const meta = resumeMetaData[currentResumeId];

    const exportData = emptyExportData();
    const items: ResumeExportFile["items"] = [];

    for (const { kind, elementId } of sourceItems) {
        if (!elementId) continue;
        items.push({ kind, elementId });

        switch (kind) {
            case "userInfo": {
                const d = data.userInfo[elementId];
                if (!d) break;
                exportData.userInfo[elementId] = d;
                if (data.userLinks[d.userLink1]) exportData.userLinks[d.userLink1] = data.userLinks[d.userLink1];
                if (data.userLinks[d.userLink2]) exportData.userLinks[d.userLink2] = data.userLinks[d.userLink2];
                break;
            }
            case "project": {
                const d = data.projects[elementId];
                if (!d) break;
                exportData.projects[elementId] = d;
                if (data.userLinks[d.website]) exportData.userLinks[d.website] = data.userLinks[d.website];
                break;
            }
            case "bulletPoint":
                if (data.bulletPoints[elementId]) exportData.bulletPoints[elementId] = data.bulletPoints[elementId];
                break;
            case "divider":
                if (data.dividers[elementId]) exportData.dividers[elementId] = data.dividers[elementId];
                break;
            case "education":
                if (data.education[elementId]) exportData.education[elementId] = data.education[elementId];
                break;
            case "prevJob":
                if (data.prevJobs[elementId]) exportData.prevJobs[elementId] = data.prevJobs[elementId];
                break;
            case "sectionHeader":
                if (data.sectionHeaders[elementId]) exportData.sectionHeaders[elementId] = data.sectionHeaders[elementId];
                break;
            case "skill":
                if (data.skills[elementId]) exportData.skills[elementId] = data.skills[elementId];
                break;
            case "summary":
                if (data.summaries[elementId]) exportData.summaries[elementId] = data.summaries[elementId];
                break;
        }
    }

    return {
        version: RESUME_EXPORT_VERSION,
        resumeMetaData: {
            resumeName: meta?.resumeName ?? "",
            pageStyle: meta?.pageStyle ?? "Letter",
            font: meta?.font ?? "Noto Sans",
            fontScale: meta?.fontScale ?? 1,
            margin: meta?.margin ?? 75,
        },
        items,
        data: exportData,
    };
}

// Triggers a browser download of the currently active resume as a JSON file.
export function downloadResumeExport(state: ResumeState) {
    const exportFile = buildResumeExport(state);
    const safeName =
        exportFile.resumeMetaData.resumeName.trim().replace(/[^a-z0-9-_ ]/gi, "").slice(0, 60) || "resume";

    const blob = new Blob([JSON.stringify(exportFile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

const VALID_KINDS: Kinds[] = [
    "prevJob",
    "education",
    "bulletPoint",
    "skill",
    "userInfo",
    "sectionHeader",
    "summary",
    "project",
    "divider",
];

// Minimal structural validation - guards against malformed/unrelated JSON
// being fed into the importer, without being overly strict about optional fields.
export function isResumeExportFile(value: unknown): value is ResumeExportFile {
    if (!value || typeof value !== "object") return false;
    const v = value as Record<string, unknown>;
    if (!Array.isArray(v.items)) return false;
    if (!v.data || typeof v.data !== "object") return false;
    return v.items.every(
        (item) =>
            item &&
            typeof item === "object" &&
            typeof (item as { elementId?: unknown }).elementId === "string" &&
            VALID_KINDS.includes((item as { kind?: Kinds }).kind as Kinds)
    );
}

// Imports a resume export file as a brand new resume (fresh ids throughout),
// leaving any currently open resume untouched. Returns the new resume's id.
export function importResumeFromFile(imported: ResumeExportFile, dispatch: AppDispatch): string {
    const newResumeId = makeId();
    dispatch(setCurrentResume(newResumeId));
    dispatch(generateMetaData(newResumeId));
    dispatch(createEmptyResume());

    const meta = imported.resumeMetaData;
    if (meta?.resumeName) dispatch(changeResumeName(meta.resumeName));
    if (meta?.font) dispatch(editFont({ font: meta.font }));
    if (meta?.pageStyle) dispatch(editPageStyle(meta.pageStyle));
    if (meta?.margin) dispatch(editMargin({ margin: meta.margin }));
    if (meta?.fontScale) dispatch(editFontScale(meta.fontScale));

    const linkIdMap: Record<string, string> = {};
    function importLink(oldId?: string): string {
        if (oldId && linkIdMap[oldId]) return linkIdMap[oldId];

        const newId = makeId();
        if (oldId) linkIdMap[oldId] = newId;

        dispatch(addUserLink(newId));
        const linkData = oldId ? imported.data.userLinks?.[oldId] : undefined;
        if (linkData) dispatch(editUserLink({ id: newId, text: linkData.text ?? "Link Name", url: linkData.url ?? "URL" }));
        return newId;
    }

    for (const { kind, elementId } of imported.items) {
        const newId = makeId();

        switch (kind) {
            case "bulletPoint": {
                const d = imported.data.bulletPoints?.[elementId];
                if (!d) continue;
                dispatch(addBulletData({ id: newId, kind, text: d.text ?? "" }));
                break;
            }
            case "divider": {
                const d = imported.data.dividers?.[elementId];
                if (!d) continue;
                dispatch(addDividerData({ id: newId, kind, height: d.height ?? 20 }));
                break;
            }
            case "education": {
                const d = imported.data.education?.[elementId];
                if (!d) continue;
                dispatch(
                    addEducationData({
                        id: newId,
                        kind,
                        schoolName: d.schoolName ?? "",
                        degree: d.degree ?? "",
                        monthEnded: d.monthEnded ?? 0,
                        yearEnded: d.yearEnded ?? new Date().getFullYear(),
                    })
                );
                break;
            }
            case "prevJob": {
                const d = imported.data.prevJobs?.[elementId];
                if (!d) continue;
                dispatch(
                    addPrevJobData({
                        id: newId,
                        kind,
                        companyName: d.companyName ?? "",
                        jobTitle: d.jobTitle ?? "",
                        location: d.location ?? "",
                        monthStarted: d.monthStarted ?? 0,
                        yearStarted: d.yearStarted ?? new Date().getFullYear(),
                        monthEnded: d.monthEnded ?? 0,
                        yearEnded: d.yearEnded ?? new Date().getFullYear(),
                    })
                );
                break;
            }
            case "project": {
                const d = imported.data.projects?.[elementId];
                if (!d) continue;
                const websiteId = importLink(d.website);
                dispatch(
                    addProjectData({
                        id: newId,
                        kind,
                        title: d.title ?? "",
                        description: d.description ?? "",
                        hasWebsite: d.hasWebsite ?? false,
                        website: websiteId,
                    })
                );
                break;
            }
            case "sectionHeader": {
                const d = imported.data.sectionHeaders?.[elementId];
                if (!d) continue;
                dispatch(addSectionHeaderData({ id: newId, kind, text: d.text ?? "", underline: d.underline ?? false }));
                break;
            }
            case "skill": {
                const d = imported.data.skills?.[elementId];
                if (!d) continue;
                dispatch(
                    addSkillData({
                        id: newId,
                        kind,
                        list: Array.isArray(d.list) ? d.list : [],
                        showCategory: d.showCategory ?? false,
                        category: d.category ?? "Category",
                    })
                );
                break;
            }
            case "summary": {
                const d = imported.data.summaries?.[elementId];
                if (!d) continue;
                dispatch(addSummaryData({ id: newId, kind, text: d.text ?? "" }));
                break;
            }
            case "userInfo": {
                const d = imported.data.userInfo?.[elementId];
                if (!d) continue;
                const link1 = importLink(d.userLink1);
                const link2 = importLink(d.userLink2);
                dispatch(
                    addUserInfoData({
                        id: newId,
                        kind,
                        fullName: d.fullName ?? "",
                        showIcons: d.showIcons ?? false,
                        professionTitle: d.professionTitle ?? "",
                        showProfession: d.showProfession ?? false,
                        hasUnderline: d.hasUnderline ?? false,
                        email: d.email ?? "",
                        phoneNumber: d.phoneNumber ?? "",
                        location: d.location ?? "",
                        userLink1: link1,
                        userLink2: link2,
                        showLink1: d.showLink1 ?? false,
                        showLink2: d.showLink2 ?? false,
                    })
                );
                break;
            }
            default:
                continue;
        }

        dispatch(addResumeItem({ kind, elementId: newId }));
    }

    return newResumeId;
}
