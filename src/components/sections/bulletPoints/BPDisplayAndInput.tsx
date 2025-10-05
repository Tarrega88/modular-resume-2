import { useState } from "react";

type Props = {
  text: string;
  id: string;
  editData(id: string, text: string): void;
  placeholderText?: string;
  renderUI: boolean;
};

function BPDisplayAndInput({
  text = "",
  id,
  editData,
  placeholderText,
  renderUI,
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
      inert={!renderUI}
      className="group hover:bg-sky-50 transition-all duration-150 cursor-pointer w-full mb-1 h-full"
      onClick={setDisplayToInput}
      tabIndex={0}
      onKeyDown={() => setDisplayMode("input")}
    >
      <p className="flex">
        <span
          className="ml-1 mr-2 pointer-events-none"
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
    <div className="w-full flex h-full mb-1">
      <span className="ml-1 mr-2">•</span>
      <textarea
        rows={Math.ceil(tempText.length / 80)}
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
