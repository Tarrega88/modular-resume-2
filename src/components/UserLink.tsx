import { editUserLink } from "../state/resumeSlice";
import { RootState } from "../state/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  id: string;
  inputWidth: "char" | "full" | "max";
  divWidth?: "char" | "full" | "max";
  textAlign?: "left" | "center" | "right";
};

function UserLink({ id, inputWidth, divWidth, textAlign }: Props) {
  const dispatch = useDispatch();

  const { userLinks } = useSelector((state: RootState) => state.resume.data);

  const { text, url } = userLinks[id];

  const [showInput, setShowInput] = useState(false);
  const [tempText, setTempText] = useState(text);
  const [tempUrl, setTempUrl] = useState(url);

  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);

  function changeDisplay() {
    dispatch(editUserLink({ id, text: tempText, url: tempUrl }));
    const a = document.activeElement;
    if (a === input1.current) input2.current?.focus();
    else if (a === input2.current) setShowInput(false);
  }

  const onWrapperBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    dispatch(editUserLink({ id, text: tempText, url: tempUrl }));
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setShowInput(false);
    }
  };

  const maxLength = Math.max(11, Math.max(tempText?.length, tempUrl?.length));

  const widths = {
    char: `${maxLength || 1}ch`,
    full: "100%",
    max: "max-content",
  };

  return showInput ? (
    <div className="relative" onBlur={onWrapperBlur}>
      <div>
        <input
          ref={input1}
          autoFocus
          className="outline-1 rounded-xs"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && changeDisplay()}
          placeholder="Link Name"
          style={{ width: `${widths[inputWidth]}`, textAlign }}
        />
      </div>
      <div>
        <input
          ref={input2}
          type="url"
          className="absolute outline-1 rounded-xs"
          value={tempUrl}
          onChange={(e) => setTempUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && changeDisplay()}
          placeholder="URL"
          style={{ width: `${widths[inputWidth]}`, textAlign }}
        />
      </div>
    </div>
  ) : (
    <a
      href={url}
      style={
        divWidth
          ? { width: `${widths[divWidth]}`, textAlign }
          : { width: "100%", textAlign }
      }
      className="group hover:bg-sky-50 transition-all duration-150 underline underline-offset-2"
      onClick={(e) => {
        e.preventDefault();
        setShowInput(true);
      }}
    >
      {text.length > 0 ? (
        text
      ) : (
        <span className="opacity-0 group-hover:opacity-75 transition-all duration-200">
          Enter Link Name
        </span>
      )}
    </a>
  );
}

export default UserLink;
