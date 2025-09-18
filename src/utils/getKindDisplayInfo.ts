export const kindToData = {
    prevJob: "prevJobs",
    education: "education",
    project: "projects",
    summary: "summaries",
    bulletPoint: "bulletPoints",
    userInfo: "userInfo",
    sectionHeader: "sectionHeaders",
    skill: "skills",
    divider: "dividers",
};

export const sections = [
    { title: "Bullet", kind: "bulletPoint" },
    { title: "Info", kind: "userInfo" },
    { title: "Education", kind: "education" },
    { title: "Experience", kind: "prevJob" },
    { title: "Header", kind: "sectionHeader" },
    { title: "Skill", kind: "skill" },
    { title: "Project", kind: "project" },
    { title: "Text", kind: "summary" },
    { title: "Divider", kind: "divider" },
];

export const kindToSection = Object.fromEntries(
    sections.map((e) => [e.kind, e.title])
);