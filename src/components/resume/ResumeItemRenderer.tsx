import BulletPoint from "../sections/bulletPoints/BulletPoint";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import JobSection from "../sections/previousJob/JobSection";
import ResumeHeader from "../sections/userInfo/ResumeHeader";
import SectionHeader from "../sections/header/SectionHeader";
import { ResumeItemProps } from "../../state/types";
import SkillSection from "../sections/skills/SkillSection";
import Summary from "../sections/summaries/Summary";
import EducationSection from "../sections/education/EducationSection";
import ProjectSection from "../projects/ProjectSection";
import Divider from "../sections/divider/Divider";
import {
  getBulletPointProps,
  getDividerProps,
  getEducationProps,
  getPrevJobProps,
  getProjectProps,
  getSectionHeaderProps,
  getSkillProps,
  getSummaryProps,
  getUserInfoProps,
} from "@/utils/getProps";

//TODO 10/6/2025: consider adding "editMode" boolean to all of these sections, to allow for editing mode logic for mobile
//TODO 10/4/2025: ID is passed down due to props but unused - might want to see if it's even needed
function ResumeItemRenderer({
  kind,
  elementId,
  renderUI,
}: ResumeItemProps & { renderUI: boolean }) {
  const { data } = useSelector((state: RootState) => state.resume);

  switch (kind) {
    case "userInfo":
      const info = elementId ? data.userInfo[elementId] : getUserInfoProps("");
      return (
        <ResumeHeader
          id={info.id}
          kind={info.kind}
          showIcons={info.showIcons}
          professionTitle={info.professionTitle}
          showProfession={info.showProfession}
          hasUnderline={info.hasUnderline}
          fullName={info.fullName}
          email={info.email}
          phoneNumber={info.phoneNumber}
          location={info.location}
          userLink1={info.userLink1}
          userLink2={info.userLink2}
          showLink1={elementId ? info.showLink1 : false}
          showLink2={elementId ? info.showLink2 : false}
          renderUI={renderUI}
        />
      );
    case "prevJob":
      const {
        companyName,
        id,
        jobTitle,
        kind,
        location,
        monthStarted,
        yearStarted,
        monthEnded,
        yearEnded,
      } = elementId ? data.prevJobs[elementId] : getPrevJobProps("");
      return (
        <JobSection
          id={id}
          companyName={companyName}
          jobTitle={jobTitle}
          kind={kind}
          location={location}
          monthStarted={monthStarted}
          yearStarted={yearStarted}
          monthEnded={monthEnded}
          yearEnded={yearEnded}
          renderUI={renderUI}
        />
      );
    case "bulletPoint":
      const bp = elementId
        ? data?.bulletPoints[elementId]
        : getBulletPointProps("");
      return (
        <BulletPoint
          key={bp.text}
          id={bp.id}
          kind={bp.kind}
          text={bp.text}
          renderUI={renderUI}
        />
      );
    case "sectionHeader": {
      const sectionHeaderData = elementId
        ? data.sectionHeaders[elementId]
        : getSectionHeaderProps("");
      return (
        <SectionHeader
          id={sectionHeaderData.id}
          kind="sectionHeader"
          text={sectionHeaderData.text}
          underline={sectionHeaderData.underline}
          renderUI={renderUI}
        />
      );
    }
    case "skill": {
      const skillData = elementId ? data.skills[elementId] : getSkillProps("");
      return (
        <SkillSection
          id={skillData.id}
          kind={skillData.kind}
          showCategory={skillData.showCategory}
          category={skillData.category}
          list={skillData.list}
          renderUI={renderUI}
        />
      );
    }
    case "summary": {
      const summaryData = elementId
        ? data.summaries[elementId]
        : getSummaryProps("");
      return (
        <Summary
          id={summaryData.id}
          text={summaryData.text}
          kind={summaryData.kind}
          renderUI={renderUI}
        />
      );
    }
    case "education":
      const educationData = elementId
        ? data.education[elementId]
        : getEducationProps("");
      return (
        <EducationSection
          id={educationData.id}
          kind={educationData.kind}
          schoolName={educationData.schoolName}
          degree={educationData.degree}
          monthEnded={educationData.monthEnded}
          yearEnded={educationData.yearEnded}
          renderUI={renderUI}
        />
      );
    case "project": {
      const projectData = elementId
        ? data.projects[elementId]
        : getProjectProps("");
      return (
        <ProjectSection
          id={projectData.id}
          kind={projectData.kind}
          title={projectData.title}
          description={projectData.description}
          hasWebsite={elementId ? projectData.hasWebsite : false}
          website={projectData.website}
          renderUI={renderUI}
        />
      );
    }
    case "divider": {
      const dividerData = elementId
        ? data.dividers[elementId]
        : getDividerProps("");
      return (
        <Divider
          id={dividerData.id}
          height={dividerData.height}
          kind={dividerData.kind}
          renderUI={renderUI}
        />
      );
    }
    default:
      return;
  }
}

export default ResumeItemRenderer;
