import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ResumeItemRenderer from "../resume/ResumeItemRenderer";
import { removeResumeItem } from "@/state/resumeSlice";
import MobileButtonWrapper from "./MobileButtonWrapper";

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

  return (
    <div className="w-full sm:hidden block">
      <div className="w-full overflow-auto flex flex-1 h-[140px] items-center">
        <div className="min-w-max w-full h-max bg-white text-black">
          <ResumeItemRenderer
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
        <div>Mobile Layout Under Construction</div>
      </MobileButtonWrapper>
    </div>
  );
}

export default MobileCommandStrip;
