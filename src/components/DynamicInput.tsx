import { useState } from "react";

type Props = {
  text: string;
  handleOnSubmit(e: string): void;
  inputWidth: "char" | "full" | "max";
  divWidth?: "char" | "full" | "max";
  textAlign?: "left" | "center" | "right";
  placeholderText?: string;
};

//TODO 9/16/2025: add tooltips (title)

function DynamicInput({
  text,
  handleOnSubmit,
  inputWidth,
  divWidth,
  textAlign = "left",
  placeholderText,
}: Props) {
  const [showInput, setShowInput] = useState(false);
  const [tempText, setTempText] = useState(text);

  function changeDisplay() {
    handleOnSubmit(tempText);
    setShowInput(false);
  }

  const widths = {
    char: `${tempText?.length || 1}ch`,
    full: "100%",
    max: "max-content",
  };

  return showInput ? (
    <input
      autoFocus
      // onFocus={(e) => e.target.select()}
      className="outline-1 rounded-xs"
      value={tempText}
      onChange={(e) => setTempText(e.target.value)}
      onBlur={changeDisplay}
      onKeyDown={(e) => e.key === "Enter" && changeDisplay()}
      style={{ width: `${widths[inputWidth]}`, textAlign }}
    />
  ) : (
    <div
      onKeyDown={(e) => e.key === "Enter" && setShowInput(true)}
      style={
        divWidth
          ? { width: `${widths[divWidth]}`, textAlign }
          : { width: "100%", textAlign }
      }
      className="group hover:bg-sky-50 transition-all duration-150"
      onClick={() => setShowInput(true)}
      tabIndex={0}
    >
      {text.length > 0 ? (
        text
      ) : (
        <span className="opacity-0 group-hover:opacity-75 transition-all duration-200">
          {placeholderText ? placeholderText : "..."}
        </span>
      )}
    </div>
  );
}

export default DynamicInput;
