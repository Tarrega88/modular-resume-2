import { IoIosArrowForward } from "react-icons/io";

function DropdownBranch({ title, i, expanded, setExpanded, children }) {
  const isExpanded = i === expanded;

  function handleMouseEnter() {
    setExpanded(i);
  }

  const style = isExpanded ? "bg-neutral-600" : "bg-neutral-700";

  return (
    <div className={`relative ${style}`}>
      <button
        onMouseDown={() => setExpanded(i === expanded ? -1 : i)}
        className="p-1 px-2 w-full text-start flex items-center justify-between"
        onMouseEnter={handleMouseEnter}
      >
        <span>{title}</span>
        <span>
          <IoIosArrowForward />
        </span>
      </button>
      <div className="absolute w-full left-full top-0 border-neutral-500">
        <div className="flex flex-col">{isExpanded ? children : null}</div>
      </div>
    </div>
  );
}

export default DropdownBranch;
