import { useState } from "react";

type Props = {
  text: string;
  handleOnSubmit(e: string): void;
  inputWidth: "char" | "full" | "max";
  divWidth?: "char" | "full" | "max";
  textAlign?: "left" | "center" | "right";
  placeholderText?: string;
};

function DynamicTextArea({
  text,
  handleOnSubmit,
  inputWidth,
  divWidth,
  textAlign = "left",
  placeholderText,
}: Props) {
  const [showInput, setShowInput] = useState(false);
  const [tempText, setTempText] = useState(text);

  // TODO 9/11/2025: consider tying input height to div height

  function changeDisplay() {
    handleOnSubmit(tempText.trimEnd());
    setShowInput(false);
  }

  const widths = {
    char: `${tempText?.length || 1}ch`,
    full: "100%",
    max: "max-content",
  };

  return showInput ? (
    <textarea
      autoFocus
      className="min-h-36 outline-1"
      value={tempText}
      onChange={(e) => setTempText(e.target.value)}
      onBlur={changeDisplay}
      onKeyDown={(e) => {
        e.key === "Enter" && e.shiftKey && changeDisplay();
      }}
      style={{
        width: `${widths[inputWidth]}`,
        textAlign,
      }}
    />
  ) : (
    <div
      style={
        divWidth
          ? { width: `${widths[divWidth]}`, textAlign }
          : { width: "100%", textAlign }
      }
      className="group hover:bg-sky-50 transition-all duration-150 whitespace-pre-wrap"
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

export default DynamicTextArea;
