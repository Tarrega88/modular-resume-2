import { useState } from "react";

type Props = {
  text: string;
  handleOnSubmit(e: string): void;
  inputWidth: "char" | "full" | "max";
  divWidth?: "char" | "full" | "max";
  textAlign?: "left" | "center" | "right";
  placeholderText?: string;
};

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
      className="outline-1 rounded-xs"
      value={tempText}
      onChange={(e) => setTempText(e.target.value)}
      onBlur={changeDisplay}
      onKeyDown={(e) => e.key === "Enter" && changeDisplay()}
      style={{ width: `${widths[inputWidth]}`, textAlign }}
    />
  ) : (
    <div
      style={
        divWidth
          ? { width: `${widths[divWidth]}`, textAlign }
          : { width: "100%", textAlign }
      }
      className="group hover:bg-sky-50 transition-all duration-150"
      onClick={() => setShowInput(true)}
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
