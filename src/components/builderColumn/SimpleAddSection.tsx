import { sections } from "@/utils/getKindDisplayInfo";
import SimpleAddButton from "./SimpleAddButton";
import { GoDotFill } from "react-icons/go";
import { RxDividerHorizontal } from "react-icons/rx";
import { GiGraduateCap, GiSkills } from "react-icons/gi";
import { FaBriefcase, FaTools, FaUser } from "react-icons/fa";
import { TbCircleLetterHFilled } from "react-icons/tb";
import { MdOutlineTextSnippet } from "react-icons/md";

function SimpleAddSection() {
  function handleOnClick() {
    //temp
  }
  return (
    <div className="pb-6 bg-blue-950 border-b">
      <div className="flex flex-col gap-3 items-center">
        <div className="bg-blue-950 text-sky-50 w-full h-10 flex items-center justify-center font-semibold pt-2">
          Add Section
        </div>
        <SimpleAddButton text="Bullet Point" handleOnClick={handleOnClick}>
          <GoDotFill />
        </SimpleAddButton>
        <SimpleAddButton text="Divider" handleOnClick={handleOnClick}>
          <RxDividerHorizontal />
        </SimpleAddButton>
        <SimpleAddButton text="Education" handleOnClick={handleOnClick}>
          <GiGraduateCap />
        </SimpleAddButton>
        <SimpleAddButton text="Experience" handleOnClick={handleOnClick}>
          <FaBriefcase />
        </SimpleAddButton>
        <SimpleAddButton text="Section Header" handleOnClick={handleOnClick}>
          <TbCircleLetterHFilled />
        </SimpleAddButton>
        <SimpleAddButton text="Contact Info" handleOnClick={handleOnClick}>
          <FaUser />
        </SimpleAddButton>
        <SimpleAddButton text="Skills" handleOnClick={handleOnClick}>
          <GiSkills />
        </SimpleAddButton>
        <SimpleAddButton text="Project" handleOnClick={handleOnClick}>
          <FaTools />
        </SimpleAddButton>
        <SimpleAddButton text="Text Block" handleOnClick={handleOnClick}>
          <MdOutlineTextSnippet />
        </SimpleAddButton>
      </div>
    </div>
  );
}

export default SimpleAddSection;
