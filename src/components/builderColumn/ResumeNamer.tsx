import { changeResumeName } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ResumeNamer() {
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );
  const [isInput, setIsInput] = useState(false);
  const dispatch = useDispatch();

  const name = resumeMetaData[currentResumeId].resumeName;
  const [tempText, setTempText] = useState(name);

  function handleNameChange() {
    if (tempText.length > 50) {
      //TODO 9/18/2025: show toast?
      return;
    } else {
      dispatch(changeResumeName(tempText));
      setIsInput(false);
    }
  }

  return (
    <div className="flex bg-blue-50 flex-col items-center">
      {/* <div>Resume Name</div> */}
      {isInput ? (
        <input
          className="px-1"
          value={tempText}
          autoFocus
          onChange={(e) => setTempText(e.target.value)}
          onBlur={handleNameChange}
          onKeyDown={(e) => e.key === "Enter" && handleNameChange()}
        />
      ) : (
        <button onClick={() => setIsInput(true)} className="cursor-pointer">
          {resumeMetaData[currentResumeId].resumeName || "Name Resume"}
        </button>
      )}
    </div>
  );
}

export default ResumeNamer;
