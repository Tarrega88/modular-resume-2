import { useDispatch, useSelector } from "react-redux";
import {
  addBulletData,
  addEducationData,
  addPrevJobData,
  addResumeItem,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  createEmptyResume,
  setCurrentResume,
} from "../state/resumeSlice";
import { RootState } from "../state/store";
import { Kinds } from "../state/types";
import { useNavigate } from "react-router-dom";

type RenderProps = {
  kind: Kinds;
  text?: string;
};

const newResumeRenderItems: RenderProps[] = [
  { kind: "userInfo" },
  { kind: "summary" },
  { kind: "sectionHeader", text: "Experience" },
  { kind: "prevJob" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "bulletPoint" },
  { kind: "sectionHeader", text: "Education" },
  { kind: "education" },
  { kind: "sectionHeader", text: "Skills" },
  { kind: "skill" },
  { kind: "sectionHeader", text: "Projects" },
];

export default function GenerateResumeButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((s: RootState) => s.resume.data);
  const { userInfo } = state;
  const { location } = userInfo;

  function handleClick() {
    const newResumeId = crypto.randomUUID();

    dispatch(setCurrentResume(newResumeId));
    dispatch(createEmptyResume());

    for (const item of newResumeRenderItems) {
      const kind = item.kind;
      const id = crypto.randomUUID();

      switch (kind) {
        case "prevJob":
          dispatch(
            addPrevJobData({
              id,
              kind,
              companyName: "Company Name",
              jobTitle: "Job Title",
              location: location || "City, ST",
              monthStarted: 0,
              monthEnded: 12,
              yearStarted: 2000,
              yearEnded: 2025,
            })
          );
          break;
        case "bulletPoint":
          dispatch(
            addBulletData({
              id,
              kind,
              text: "Enter bullet point or choose from dropdown...",
            })
          );
          break;
        case "sectionHeader":
          dispatch(
            addSectionHeaderData({
              id,
              kind: "sectionHeader",
              text: item.text,
              underline: true,
            })
          );
          break;
        case "education":
          dispatch(
            addEducationData({
              id,
              kind: "education",
              schoolName: "University Name",
              degree: "Degree, Honors, GPA",
              monthEnded: 0,
              yearEnded: 2025,
            })
          );
          break;
        case "skill":
          dispatch(
            addSkillData({
              id,
              kind,
              list: ["List skills here and separate them with commas"],
              showCategory: false,
              category: "Category",
            })
          );
          break;
        case "summary":
          dispatch(addSummaryData({ id, kind, text: "Enter summary text..." }));
          break;
      }

      dispatch(addResumeItem({ kind, elementId: id }));
    }

    navigate(`/builder/${newResumeId}`);
  }

  return <button onClick={handleClick}>Generate New Resume</button>;
}
