import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function ExpandableContainer({ children, title, startExpanded }) {
  const [isExpanded, setIsExpanded] = useState(startExpanded);
  return (
    <>
      <button
        className="bg-blue-50 h-10 flex items-center justify-center gap-2 px-2 transition-all duration-200 cursor-pointer hover:bg-blue-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold select-none">{title}</span>
        <IoMdArrowDropdown
          className={`${
            isExpanded ? "rotate-0" : "-rotate-90"
          } transition-all duration-200`}
        />
      </button>
      {isExpanded ? children : null}
    </>
  );
}

export default ExpandableContainer;
