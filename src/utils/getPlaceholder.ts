import { Kinds, BulletPointProps, PrevJobProps, EducationProps, SkillProps, UserInfoProps, SectionHeaderProps, SummaryProps, ProjectProps } from "@/state/types"

export default function getPlaceholder(kind: Kinds, field: string, id: string) {
    const placeHolders = {
        "userInfo": {
            fullName: "Full Name",
            showIcons: true,
            professionTitle: "Profession",
            showProfession: true,
            hasUnderline: true,
            kind,
            email: "email@gmail.com",
            phoneNumber: "(123) 456-7890",
            location: "City, ST",
            userLink1: crypto.randomUUID(),
            userLink2: crypto.randomUUID(),
            showLink1: true,
            showLink2: true,
        } as UserInfoProps,
        "summary": {

        } as SummaryProps,
        "bulletPoint": {} as BulletPointProps,
        "education": {} as EducationProps,
        "prevJob": {} as PrevJobProps,
        "project": {} as ProjectProps,
        "sectionHeader": {} as SectionHeaderProps,
        "skill": {} as SkillProps

    }

    return placeHolders[kind];

}