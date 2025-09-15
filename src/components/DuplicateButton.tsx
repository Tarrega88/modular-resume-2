import {
  getBulletPointProps,
  getEducationProps,
  getPrevJobProps,
  getSectionHeaderProps,
  getSkillProps,
  getSummaryProps,
} from "@/utils/getProps";
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
        dispatch(addBulletData(getBulletPointProps(id)));
        break;
      case "education":
        dispatch(addEducationData(getEducationProps(id)));
        break;
      case "prevJob":
        dispatch(addPrevJobData(getPrevJobProps(id)));
        break;
      case "skill":
        dispatch(addSkillData(getSkillProps(id)));
        break;
      case "sectionHeader":
        dispatch(addSectionHeaderData(getSectionHeaderProps(id)));
        break;
      case "summary":
        dispatch(addSummaryData(getSummaryProps(id)));
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
