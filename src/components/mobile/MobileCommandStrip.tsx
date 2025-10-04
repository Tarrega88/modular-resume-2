import { RootState } from "@/state/store";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ResumeItemRenderer from "../resume/ResumeItemRenderer";
import { IoAddCircle } from "react-icons/io5";
import { removeResumeItem } from "@/state/resumeSlice";

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
      <div className="w-full overflow-auto flex flex-1 bg-white text-black h-[100px]">
        <div className="min-w-max w-full">
          <ResumeItemRenderer
            id={id}
            kind={kind}
            elementId={elementId}
            renderUI={true}
          />
        </div>
      </div>
      <div
        className="bg-gray-500 w-full sm:hidden flex items-center"
        style={{ height: "200px" }}
      >
        <div className="flex flex-col h-full justify-center">
          <button
            onClick={() =>
              setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1)
            }
          >
            <span className="text-3xl">
              <IoIosArrowBack />
            </span>
          </button>
        </div>
        {/* <div className="w-full overflow-auto flex flex-1 bg-white text-black">
          <div className="min-w-max w-full">
            <ResumeItemRenderer
              id={id}
              kind={kind}
              elementId={elementId}
              renderUI={true}
            />
          </div>
        </div> */}
        <div className="flex flex-col relative h-full justify-center">
          <div className="absolute top-2 right-1">
            <button onClick={handleDelete}>
              <IoAddCircle
                className="rotate-45 text-red-600 outline-0 text-2xl"
                tabIndex={-1}
              />
            </button>
          </div>
          <button onClick={() => setActiveIndex((activeIndex + 1) % length)}>
            <span className="text-3xl">
              <IoIosArrowForward />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileCommandStrip;
