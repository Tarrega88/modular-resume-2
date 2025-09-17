// import { locationDefault } from "../state/resumeSlice";
// import BulletPoint from "./bulletPoints/BulletPoint";
// import { useSelector } from "react-redux";
// import { RootState } from "../state/store";
// import JobSection from "./previousJob/JobSection";
// import ResumeHeader from "./ResumeHeader";
// import SectionHeader from "./SectionHeader";
// import { ResumeItemProps } from "../state/types";
// import SkillSection from "./skills/SkillSection";
// import Summary from "./summaries/Summary";
// import EducationSection from "./education/EducationSection";
// import ProjectSection from "./projects/ProjectSection";
// import Divider from "./Divider";
// import {
//   getBulletPointProps,
//   getPrevJobProps,
//   getSectionHeaderProps,
//   getUserInfoProps,
// } from "@/utils/getProps";

// function DefaultItemRenderer({
//   id,
//   kind,
//   renderIndex,
//   renderUI,
// }: ResumeItemProps & { renderIndex: number; renderUI: boolean }) {
//   const { data } = useSelector((state: RootState) => state.resume);

//   switch (kind) {
//     case "userInfo":
//       const info = getUserInfoProps("");
//       return (
//         <ResumeHeader
//           id={info.id}
//           kind={info.kind}
//           showIcons={info.showIcons}
//           professionTitle={info.professionTitle}
//           showProfession={info.showProfession}
//           hasUnderline={info.hasUnderline}
//           fullName={info.fullName}
//           email={info.email}
//           phoneNumber={info.phoneNumber}
//           location={info.location}
//           renderIndex={renderIndex}
//           userLink1={info.userLink1}
//           userLink2={info.userLink2}
//           showLink1={info.showLink1}
//           showLink2={info.showLink2}
//           renderUI={renderUI}
//         />
//       );
//     case "prevJob":
//       const {
//         companyName,
//         id,
//         jobTitle,
//         kind,
//         location,
//         monthStarted,
//         yearStarted,
//         monthEnded,
//         yearEnded,
//       } = getPrevJobProps("");
//       return (
//         <JobSection
//           id={id}
//           companyName={companyName}
//           jobTitle={jobTitle}
//           kind={kind}
//           location={location}
//           monthStarted={monthStarted}
//           yearStarted={yearStarted}
//           monthEnded={monthEnded}
//           yearEnded={yearEnded}
//           renderIndex={renderIndex}
//         />
//       );
//     case "bulletPoint":
//       const bp = getBulletPointProps("");
//       return (
//         <BulletPoint
//           key={bp.text}
//           id={bp.id}
//           kind={bp.kind}
//           text={bp.text}
//           renderIndex={renderIndex}
//         />
//       );
//     case "sectionHeader": {
//       const sectionHeaderData = getSectionHeaderProps("");
//       return (
//         <SectionHeader
//           id={sectionHeaderData.id}
//           kind="sectionHeader"
//           text={sectionHeaderData.text}
//           underline={sectionHeaderData.underline}
//           renderIndex={renderIndex}
//           renderUI={renderUI}
//         />
//       );
//     }
//     case "skill": {
//       const skillData = data.skills[elementId];
//       return (
//         <SkillSection
//           id={skillData.id}
//           kind={skillData.kind}
//           showCategory={skillData.showCategory}
//           category={skillData.category}
//           list={skillData.list}
//           renderIndex={renderIndex}
//           renderUI={renderUI}
//         />
//       );
//     }
//     case "summary": {
//       const summaryData = data.summaries[elementId];
//       return (
//         <Summary
//           id={summaryData.id}
//           text={summaryData.text}
//           kind={summaryData.kind}
//         />
//       );
//     }
//     case "education":
//       const educationData = data.education[elementId];
//       return (
//         <EducationSection
//           id={educationData.id}
//           kind={educationData.kind}
//           schoolName={educationData.schoolName}
//           degree={educationData.degree}
//           monthEnded={educationData.monthEnded}
//           yearEnded={educationData.yearEnded}
//         />
//       );
//     case "project": {
//       const projectData = data.projects[elementId];
//       return (
//         <ProjectSection
//           id={projectData.id}
//           kind={projectData.kind}
//           title={projectData.title}
//           description={projectData.description}
//           hasWebsite={projectData.hasWebsite}
//           website={projectData.website}
//           renderUI={renderUI}
//         />
//       );
//     }
//     case "divider": {
//       const dividerData = data.dividers[elementId];
//       return (
//         <Divider
//           id={dividerData.id}
//           height={dividerData.height}
//           kind={dividerData.kind}
//         />
//       );
//     }
//     default:
//       return;
//   }
// }

// export default DefaultItemRenderer;
