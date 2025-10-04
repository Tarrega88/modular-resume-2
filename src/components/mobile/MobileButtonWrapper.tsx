import {
  dragResumeItem,
  setDragFromIndex,
  setDragToIndex,
} from "@/state/resumeSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbArrowMoveDown, TbArrowMoveUp } from "react-icons/tb";
import { useDispatch } from "react-redux";

function MobileButtonWrapper({
  children,
  activeIndex,
  setActiveIndex,
  length,
}) {
  const dispatch = useDispatch();

  function handleMoveBack() {
    dispatch(setDragFromIndex(activeIndex));
    const toIndex = activeIndex === 0 ? length - 1 : activeIndex - 1;
    dispatch(setDragToIndex(toIndex));
    dispatch(dragResumeItem());
    dispatch(setDragFromIndex(-1));
    dispatch(setDragToIndex(-1));
    setActiveIndex(toIndex);
  }

  function handleMoveForward() {
    dispatch(setDragFromIndex(activeIndex));
    const toIndex = (activeIndex + 1) % length;
    dispatch(setDragToIndex(toIndex));
    dispatch(dragResumeItem());
    dispatch(setDragFromIndex(-1));
    dispatch(setDragToIndex(-1));
    setActiveIndex(toIndex);
  }

  return (
    <div
      className="bg-gray-500 w-full sm:hidden flex items-center justify-between"
      style={{ height: "150px" }}
    >
      <div className="flex flex-col h-full justify-end border-r w-16">
        <div className="flex justify-center items-center size-full">
          <button onClick={handleMoveBack}>
            <span className="text-3xl">
              <TbArrowMoveUp />
            </span>
          </button>
        </div>
        <div className="border-t flex justify-center items-center size-full">
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
      </div>
      {children}
      <div className="flex flex-col h-full justify-end border-l w-16">
        <div className="flex justify-center items-center size-full">
          <button onClick={handleMoveForward}>
            <span className="text-3xl">
              <TbArrowMoveDown />
            </span>
          </button>
        </div>
        <div className="border-t flex justify-center items-center size-full">
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

export default MobileButtonWrapper;
