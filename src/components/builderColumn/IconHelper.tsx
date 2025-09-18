import { RxCaretDown } from "react-icons/rx";
import IconHelperRow from "./IconHelperRow";
import { IoAddCircle, IoDuplicate } from "react-icons/io5";
import { FiUnderline } from "react-icons/fi";
import {
  IoIosInformationCircle,
  IoIosLink,
  IoMdArrowDropdown,
} from "react-icons/io";
import { MdLabel, MdOutlineTitle } from "react-icons/md";
import { useState } from "react";

function IconHelper() {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="bg-blue-100">
      <div className="pb-2 font-bold border-b py-2 flex items-center justify-center gap-2 px-2 hover:bg-sky-200 transition-all duration-200 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="select-none">Icon Legend</div>
        <IoMdArrowDropdown className={`${isExpanded ? "rotate-360" : "rotate-270"} transition-all duration-200`} />
      </div>
        {isExpanded ? (
          <div className="flex flex-col bg-blue-100 items-center">
            <IconHelperRow
              iconName="Dropdown"
              description="Opens a window that allows you to view your previously made sections"
            >
              <RxCaretDown />
            </IconHelperRow>
            <IconHelperRow
              iconName="Duplicate Section"
              description="Adds a default section of the same type underneath the current section"
            >
              <IoDuplicate tabIndex={-1} className="text-sky-600" />
            </IconHelperRow>
            <IconHelperRow
              iconName="Remove Section"
              description="Removes a section from the resume"
            >
              <IoAddCircle className="rotate-45 text-red-600" tabIndex={-1} />
            </IconHelperRow>
            <IconHelperRow
              iconName="Icons"
              description="Toggle whether a contact information section will have icons"
            >
              <IoIosInformationCircle className="text-sky-500" />
            </IconHelperRow>
            <IconHelperRow
              iconName="Profession Title"
              description="Toggle the professional title under your name"
            >
              <MdOutlineTitle className="text-neutral-800" />
            </IconHelperRow>
            <IconHelperRow
              iconName="Underline"
              description="Toggle the underline on section headers and contact info sections"
            >
              <FiUnderline />
            </IconHelperRow>
            <IconHelperRow
              iconName="Link"
              description="Toggle whether a section has a link, typically for showcasing a portfolio website or project"
            >
              <IoIosLink className="text-blue-600" />
            </IconHelperRow>
            <IconHelperRow
              iconName="Label"
              description="Toggles whether a list has a category, typically used to categorize skills into things like Programming Languages, Software, and soft skills"
            >
              <MdLabel className="text-sky-500" tabIndex={-1} />
            </IconHelperRow>
          </div>
        ) : null}
    </div>
  );
}

export default IconHelper;
