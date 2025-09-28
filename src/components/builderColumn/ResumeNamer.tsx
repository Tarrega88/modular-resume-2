import { changeResumeName } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function ResumeNamer() {
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );
  const [isInput, setIsInput] = useState(false);
  const dispatch = useDispatch();

  const resumeName = resumeMetaData[currentResumeId]?.resumeName;
  const [tempText, setTempText] = useState(resumeName);

  function handleNameChange() {
    if (tempText === resumeName) {
      setIsInput(false);
      return;
    }
    if (tempText.length > 50) {
      toast.error("Resume name must be 50 chars or less");
    } else {
      dispatch(changeResumeName(tempText));
      if (tempText.length === 0) {
        setIsInput(false);
      } else {
        toast.success(`Resume renamed to ${tempText}`);
        setIsInput(false);
      }
    }
  }

  function handleOnChange(text: string) {
    if (text.length > 50) {
      toast.error("Resume name must be 50 characters or less");
    } else {
      setTempText(text);
    }
  }

  return (
    <div className="flex bg-blue-50 flex-col items-center">
      {isInput ? (
        <input
          className="px-1 text-center w-4/5"
          value={tempText}
          autoFocus
          onChange={(e) => handleOnChange(e.target.value)}
          onBlur={handleNameChange}
          onKeyDown={(e) => e.key === "Enter" && handleNameChange()}
        />
      ) : (
        <button
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsInput(true)}
          onClick={() => setIsInput(true)}
          className={`w-4/5 cursor-pointer ${
            resumeName.length ? "" : "text-gray-800 opacity-50 cursor-text"
          }`}
        >
          {resumeName || "Name Resume"}
        </button>
      )}
    </div>
  );
}

export default ResumeNamer;
