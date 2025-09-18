import { sections } from "@/utils/getKindDisplayInfo";
import SimpleAddButton from "./SimpleAddButton";
import { GoDotFill } from "react-icons/go";
import { RxDividerHorizontal } from "react-icons/rx";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { FaBriefcase, FaTools, FaUser } from "react-icons/fa";
import { TbCircleLetterHFilled } from "react-icons/tb";
import { MdOutlineTextSnippet } from "react-icons/md";
import { Kinds } from "@/state/types";
import { useDispatch } from "react-redux";
import addDataFromKind from "@/utils/addDataFromKind";
import { addResumeItem } from "@/state/resumeSlice";

function SimpleAddSection() {
  const dispatch = useDispatch();
  function handleOnClick(kind: Kinds) {
    const elementId = addDataFromKind(kind, dispatch);
    dispatch(addResumeItem({ kind, elementId }));
  }
  return (
    <div className="pb-6 bg-blue-100 border-b">
      <div className="flex flex-col gap-3 items-center">
        <div className="bg-blue-100 text-sky-950 w-full h-10 flex items-center justify-center font-semibold pt-2">
          Add Section
        </div>
        <SimpleAddButton
          text="Bullet Point"
          kind="bulletPoint"
          handleOnClick={handleOnClick}
        >
          <GoDotFill />
        </SimpleAddButton>
        <SimpleAddButton
          text="Divider"
          kind="divider"
          handleOnClick={handleOnClick}
        >
          <RxDividerHorizontal />
        </SimpleAddButton>
        <SimpleAddButton
          text="Education"
          kind="education"
          handleOnClick={handleOnClick}
        >
          <GiGraduateCap />
        </SimpleAddButton>
        <SimpleAddButton
          text="Experience"
          kind="prevJob"
          handleOnClick={handleOnClick}
        >
          <FaBriefcase />
        </SimpleAddButton>
        <SimpleAddButton
          text="Section Header"
          kind="sectionHeader"
          handleOnClick={handleOnClick}
        >
          <TbCircleLetterHFilled />
        </SimpleAddButton>
        <SimpleAddButton
          text="Contact Info"
          kind="userInfo"
          handleOnClick={handleOnClick}
        >
          <FaUser />
        </SimpleAddButton>
        <SimpleAddButton
          text="Skills"
          kind="skill"
          handleOnClick={handleOnClick}
        >
          <GiSkills />
        </SimpleAddButton>
        <SimpleAddButton
          text="Project"
          kind="project"
          handleOnClick={handleOnClick}
        >
          <FaTools />
        </SimpleAddButton>
        <SimpleAddButton
          text="Text Block"
          kind="summary"
          handleOnClick={handleOnClick}
        >
          <MdOutlineTextSnippet />
        </SimpleAddButton>
      </div>
    </div>
  );
}

export default SimpleAddSection;
