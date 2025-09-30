import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function TopMenuDynamicInput({
  text,
  tempText,
  handleSubmit,
  handleOnChange,
  placeholder,
}) {
  const [isInput, setIsInput] = useState(false);

  function prepSubmit() {
    handleSubmit(tempText);
    setIsInput(false);
  }

  return isInput ? (
    <div className="relative">
      <input
        autoFocus
        className="bg-neutral-700 hover:bg-neutral-600 transition-all duration-150 flex items-center justify-between py-1 pl-1 pr-8 w-full"
        value={tempText}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && prepSubmit()}
        placeholder={placeholder}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 p-[1px] rounded-sm cursor-pointer"
        onClick={prepSubmit}
      >
        <FaCheck />
      </button>
    </div>
  ) : (
    <button
      onClick={() => setIsInput(true)}
      className="bg-neutral-700 hover:bg-neutral-600 transition-all duration-150 flex items-center justify-between px-4 py-1 w-full"
    >
      <span>{text}</span>
    </button>
  );
}

export default TopMenuDynamicInput;
