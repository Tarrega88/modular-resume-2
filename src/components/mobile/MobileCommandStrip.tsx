import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ResumeItemRenderer from "../resume/ResumeItemRenderer";
import { removeResumeItem } from "@/state/resumeSlice";
import MobileButtonWrapper from "./MobileButtonWrapper";
import ComponentDropdown from "../sections/misc/ComponentDropdown";
import { useState } from "react";
import MobileWrappedTopRow from "./MobileWrappedTopRow";

function MobileCommandStrip({ activeIndex, setActiveIndex }) {
  const dispatch = useDispatch();

  const { resumeMetaData, currentResumeId, resumes } = useSelector(
    (state: RootState) => state.resume
  );

  const resume = resumes[currentResumeId];

  const { id, kind, elementId } = resume[activeIndex];

  const length = resume.length;

  function handleDelete() {
    dispatch(removeResumeItem({ renderIndex: activeIndex }));
  }

  const [selectedKind, setSelectedKind] = useState(kind);

  return (
    <div className="w-full block">
      <div className="w-full overflow-auto flex flex-1 h-[125px] items-center">
        <div className="min-w-max w-full h-max bg-white text-black">
          <ResumeItemRenderer
            key={activeIndex}
            id={id}
            kind={kind}
            elementId={elementId}
            renderUI={true}
          />
        </div>
      </div>
      <MobileButtonWrapper
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        length={length}
      >
        <MobileWrappedTopRow
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          kind={kind}
          elementId={elementId}
        />
      </MobileButtonWrapper>
    </div>
  );
}

export default MobileCommandStrip;
