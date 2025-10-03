import { GoDotFill } from "react-icons/go";
import LowerAddButton from "./LowerAddButton";
import { FaBriefcase, FaUser } from "react-icons/fa6";
import { RxDividerHorizontal } from "react-icons/rx";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { FaTools } from "react-icons/fa";
import { TbCircleLetterHFilled } from "react-icons/tb";
import { MdOutlineTextSnippet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addResumeItem } from "@/state/resumeSlice";
import { Kinds } from "@/state/types";
import addDataFromKind from "@/utils/addDataFromKind";
import { toast } from "sonner";
import LowerTab from "./LowerTab";
import Toggle from "./Toggle";
import { RootState } from "@/state/store";
import Toggles from "./Toggles";

function LowerAddRow() {
  const dispatch = useDispatch();

  function handleOnClick(kind: Kinds, text: string) {
    const elementId = addDataFromKind(kind, dispatch);
    dispatch(addResumeItem({ kind, elementId }));
    toast.success(`Added default ${text} section.`);
  }

  return (
    <div className="flex px-4 py-2 bg-neutral-600 flex-wrap">
      <Toggles />
      <div className="flex flex-wrap gap-2 p-2 bg-neutral-600 items-center">
        <LowerAddButton
          onClick={handleOnClick}
          text="Bullet Point"
          kind="bulletPoint"
        >
          <GoDotFill />
        </LowerAddButton>
        <LowerAddButton onClick={handleOnClick} text="Contact" kind="userInfo">
          <FaUser />
        </LowerAddButton>
        <LowerAddButton onClick={handleOnClick} text="Divider" kind="divider">
          <RxDividerHorizontal />
        </LowerAddButton>
        <LowerAddButton
          onClick={handleOnClick}
          text="Education"
          kind="education"
        >
          <GiGraduateCap />
        </LowerAddButton>
        <LowerAddButton
          onClick={handleOnClick}
          text="Experience"
          kind="prevJob"
        >
          <FaBriefcase />
        </LowerAddButton>
        <LowerAddButton
          onClick={handleOnClick}
          text="Header"
          kind="sectionHeader"
        >
          <TbCircleLetterHFilled />
        </LowerAddButton>
        <LowerAddButton onClick={handleOnClick} text="Project" kind="project">
          <FaTools />
        </LowerAddButton>
        <LowerAddButton
          onClick={handleOnClick}
          text="Skills / List"
          kind="skill"
        >
          <GiSkills />
        </LowerAddButton>
        <LowerAddButton
          onClick={handleOnClick}
          text="Text Block"
          kind="summary"
        >
          <MdOutlineTextSnippet />
        </LowerAddButton>
      </div>
    </div>
  );
}

export default LowerAddRow;
