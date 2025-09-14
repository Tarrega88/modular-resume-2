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

function ResumeItemRenderer({
  id,
  kind,
  elementId,
  renderIndex,
}: ResumeItemProps & { renderIndex: number }) {
  const { data } = useSelector((state: RootState) => state.resume);

  // console.log(`RESUMES`);
  // console.log(resumes);

  // console.log("Element ID");
  // console.log(elementId);
  // console.log("data");
  // console.log(data);

  // const kindString = kind.toString();
  //TODO 8/26/2025: Probably don't need kind on these - maybe remove from the Props, or if it's needed there then make a new Props type for these?

  switch (kind) {
    case "userInfo":
      const info = data?.userInfo || {
        // id: elementId,
        kind: "userInfo",
        fullName: "Full Name",
        email: "email@email.com",
        phoneNumber: "(123) 456-7890",
        location: locationDefault,
      };
      return (
        <ResumeHeader
          kind={info.kind}
          showIcons={info.showIcons}
          professionTitle={info.professionTitle}
          showProfession={info.showProfession}
          hasUnderline={info.hasUnderline}
          fullName={info.fullName}
          email={info.email}
          phoneNumber={info.phoneNumber}
          location={info.location}
          renderIndex={renderIndex}
          userLink1={info.userLink1}
          userLink2={info.userLink2}
          showLink1={info.showLink1}
          showLink2={info.showLink2}
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
      } = data?.prevJobs[elementId] || {
        id: elementId,
        companyName: "Company Name",
        jobTitle: "Job Title",
        kind: "prevJob",
        location: locationDefault,
        monthStarted: 0,
        yearStarted: 2024,
        monthEnded: 11,
        yearEnded: 2025,
      };

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
          renderIndex={renderIndex}
        />
      );
    case "bulletPoint":
      const bp = data?.bulletPoints[elementId] || {
        id: elementId,
        kind: "bulletPoint",
        text: "Enter Bullet Point Text...",
      };
      return (
        <BulletPoint
          key={bp.text}
          id={bp.id}
          kind={bp.kind}
          text={bp.text}
          renderIndex={renderIndex}
        />
      );
    case "sectionHeader": {
      const sectionHeaderData = data.sectionHeaders[elementId];
      return (
        <SectionHeader
          id={sectionHeaderData.id}
          kind="sectionHeader"
          text={sectionHeaderData.text}
          underline={sectionHeaderData.underline}
          renderIndex={renderIndex}
        />
      );
    }
    case "skill": {
      const skillData = data.skills[elementId];
      return (
        <SkillSection
          id={skillData.id}
          kind={skillData.kind}
          showCategory={skillData.showCategory}
          category={skillData.category}
          list={skillData.list}
          renderIndex={renderIndex}
        />
      );
    }
    case "summary": {
      const summaryData = data.summaries[elementId];
      return (
        <Summary
          id={summaryData.id}
          text={summaryData.text}
          kind={summaryData.kind}
        />
      );
    }
    case "education":
      const educationData = data.education[elementId];
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
    default:
      return;
  }
}

export default ResumeItemRenderer;
