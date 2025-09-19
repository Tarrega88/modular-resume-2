import { locationDefault } from "../state/resumeSlice";
import BulletPoint from "./bulletPoints/BulletPoint";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import JobSection from "./previousJob/JobSection";
import ResumeHeader from "./ResumeHeader";
import SectionHeader from "./SectionHeader";
import { ResumeItemProps } from "../state/types";
import SkillSection from "./skills/SkillSection";
import Summary from "./summaries/Summary";
import EducationSection from "./education/EducationSection";
import ProjectSection from "./projects/ProjectSection";
import Divider from "./Divider";
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

function ResumeItemRenderer({
  kind,
  elementId,
  renderIndex,
  renderUI,
}: ResumeItemProps & { renderIndex: number; renderUI: boolean }) {
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
        />
      );
    case "bulletPoint":
      const bp = elementId
        ? data?.bulletPoints[elementId]
        : getBulletPointProps("");
      return (
        <BulletPoint key={bp.text} id={bp.id} kind={bp.kind} text={bp.text} />
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
          renderIndex={renderIndex}
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
