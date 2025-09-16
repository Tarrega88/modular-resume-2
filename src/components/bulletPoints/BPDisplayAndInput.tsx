import { useState } from "react";
import DropdownElement from "../DropdownElement";
import { Kinds } from "../../state/types";
import RelativeAbsLeft from "../wrappers/RelativeAbsLeft";

type Props = {
  text: string;
  id: string;
  options?: any[];
  kind: Kinds;
  renderIndex: number;
  editData(id: string, text: string): void;
  placeholderText?: string;
};

function BPDisplayAndInput({
  text = "",
  id,
  options,
  kind,
  renderIndex,
  editData,
  placeholderText,
}: Props) {
  const [tempText, setTempText] = useState(text);
  const [displayMode, setDisplayMode] = useState<"div" | "input">("div");

  function setDisplayToInput() {
    setDisplayMode("input");
  }

  function handleBlur() {
    setDisplayMode("div");
    editData(id, tempText);
  }

  function handleEnter(e: any) {
    if (e.key === "Enter") {
      setDisplayMode("div");
      editData(id, tempText);
    }
  }

  return displayMode === "div" ? (
    <div
      className="group hover:bg-sky-50 transition-all duration-150 cursor-pointer w-full"
      onClick={setDisplayToInput}
    >
      <p className="flex">
        <span
          className="mx-2 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          •
        </span>
        <span className="transition-all duration-150">
          {text.length ? (
            text
          ) : placeholderText ? (
            <span className="opacity-0 group-hover:opacity-75 transition-all duration-200">
              {placeholderText}
            </span>
          ) : (
            <span>...</span>
          )}
        </span>
      </p>
    </div>
  ) : (
    <div className="w-full flex">
      <span className="mx-2">•</span>
      <input
        className="w-full outline-1 rounded-xs"
        autoFocus
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export default BPDisplayAndInput;
