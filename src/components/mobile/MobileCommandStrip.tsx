import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import ResumeItemRenderer from "../resume/ResumeItemRenderer";
import { removeResumeItem } from "@/state/resumeSlice";
import MobileButtonWrapper from "./MobileButtonWrapper";
import { useState } from "react";
import MobileWrappedTopRow from "./MobileWrappedTopRow";
import MobileWrappedBottomRow from "./MobileWrappedBottomRow";

const kindDisplay = {
  bulletPoint: "Bullet Point",
  education: "Education",
  divider: "Divider",
  prevJob: "Experience",
  project: "Project",
  sectionHeader: "Section Header",
  skill: "List / Skill",
  summary: "Text Block",
  userInfo: "Contact Info",
};

function MobileCommandStrip({ activeIndex, setActiveIndex }) {
  // const dispatch = useDispatch();

  const { currentResumeId, resumes } = useSelector(
    (state: RootState) => state.resume
  );

  const resume = resumes[currentResumeId];

  console.log(activeIndex);

  const { id, kind, elementId } =
    resume[Math.min(activeIndex, resume.length - 1)];

  const length = resume.length;

  // function handleDelete() {
  //   dispatch(removeResumeItem({ renderIndex: activeIndex }));
  // }

  // const [selectedKind, setSelectedKind] = useState(kind);

  return (
    <div className="w-full block sm:hidden">
      <div>
        <div className="text-center py-1">
          Editing <span className="font-semibold">{kindDisplay[kind]}</span>
        </div>
        <div className="w-full overflow-auto flex flex-1 h-[115px]">
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
        />
        <MobileWrappedBottomRow id={id} kind={kind} elementId={elementId} />
      </MobileButtonWrapper>
    </div>
  );
}

export default MobileCommandStrip;
