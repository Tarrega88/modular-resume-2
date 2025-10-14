import { FaCheck } from "react-icons/fa6";

function TopMenuOption({ text, onClick, checked }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-neutral-700 hover:bg-neutral-600 transition-all duration-150 flex items-center justify-between px-4 py-1"
    >
      <span>{text}</span>
      <span> {checked ? <FaCheck /> : null}</span>
    </button>
  );
}

export default TopMenuOption;
