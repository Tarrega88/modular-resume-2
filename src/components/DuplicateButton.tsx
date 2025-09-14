import {
  addBulletData,
  addEducationData,
  addPrevJobData,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  duplicateSection,
} from "../state/resumeSlice";
import { Kinds } from "../state/types";
import { IoDuplicate } from "react-icons/io5";
import { useDispatch } from "react-redux";

function DuplicateButton({
  kind,
  renderIndex,
}: {
  kind: Kinds;
  renderIndex: number;
}) {
  // const dispatch = useDispatch();

  const dispatch = useDispatch();
  function handleDuplicate() {
    const id = crypto.randomUUID();

    switch (kind) {
      case "bulletPoint":
        dispatch(
          addBulletData({
            id,
            kind,
            text: "Enter bullet point text or choose from the dropdown",
          })
        );
        break;
      case "education":
        dispatch(
          addEducationData({
            id,
            kind,
            schoolName: "University Name",
            degree: "Degree",
            monthEnded: 4,
            yearEnded: 2004,
          })
        );
        break;
      case "prevJob":
        dispatch(
          addPrevJobData({
            id,
            kind,
            companyName: "Company Name",
            jobTitle: "Job Title",
            location: "City, ST",
            monthStarted: 0,
            yearStarted: 2024,
            monthEnded: 11,
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
            showCategory: true,
            category: "Category",
          })
        );
        break;

      case "sectionHeader":
        dispatch(
          addSectionHeaderData({
            id,
            kind,
            text: "Custom Header",
            underline: false,
          })
        );
        break;
      case "summary":
        dispatch(addSummaryData({ id, kind, text: "Enter summary text..." }));
        break;
    }

    dispatch(
      duplicateSection({
        kind,
        elementId: id,
        index: renderIndex,
      })
    );
  }

  return (
    <button
      onClick={handleDuplicate}
      className="text-xl cursor-pointer text-sky-600 transition-all duration-200 hover:text-sky-500"
    >
      <IoDuplicate />
    </button>
  );
}

export default DuplicateButton;
