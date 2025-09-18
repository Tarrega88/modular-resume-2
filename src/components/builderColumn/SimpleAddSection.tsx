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
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

function SimpleAddSection() {
  const dispatch = useDispatch();
  function handleOnClick(kind: Kinds) {
    const elementId = addDataFromKind(kind, dispatch);
    dispatch(addResumeItem({ kind, elementId }));
  }

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-sky-100 border-b">
      <div
        className="h-10 font-bold flex items-center justify-center gap-2 px-2 transition-all duration-200 cursor-pointer hover:bg-sky-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="font-semibold select-none">Add Section</div>
        <IoMdArrowDropdown
          className={`${
            isExpanded ? "rotate-360" : "rotate-270"
          } transition-all duration-200`}
        />
      </div>
      {isExpanded ? (
        <div className="flex flex-col gap-3 items-center pb-6">
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
      ) : null}
    </div>
  );
}

export default SimpleAddSection;
