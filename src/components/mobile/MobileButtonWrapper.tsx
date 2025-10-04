import {
  dragResumeItem,
  setDragFromIndex,
  setDragToIndex,
} from "@/state/resumeSlice";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
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
    <div className="bg-neutral-200 w-full flex items-center justify-between h-38 border-b text-neutral-950">
      <div className="flex flex-col h-full justify-end border-r w-24">
        <button
          onClick={handleMoveBack}
          className="size-full flex justify-center items-center border-b relative"
        >
          <span className="text-3xl">
            <TbArrowMoveUp />
          </span>
          <span className="absolute bottom-1 text-sm">Move</span>
        </button>
        <button
          className="size-full flex justify-center items-center relative"
          onClick={() =>
            setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1)
          }
        >
          <span className="absolute top-1 text-sm">Select</span>
          <span className="text-3xl">
            <IoIosArrowUp />
          </span>
          <span className="absolute bottom-1 text-sm">Prev</span>
        </button>
      </div>
      <div className="size-full">{children}</div>
      <div className="flex flex-col h-full justify-end border-l w-24">
        <button
          className="size-full flex justify-center items-center border-b relative"
          onClick={handleMoveForward}
        >
          <span className="text-3xl">
            <TbArrowMoveDown />
          </span>
          <span className="absolute text-sm bottom-1">Move</span>
        </button>
        <button
          className="size-full flex justify-center items-center relative"
          onClick={() => setActiveIndex((activeIndex + 1) % length)}
        >
          <span className="absolute text-sm top-1">Select</span>
          <span className="text-3xl">
            <IoIosArrowDown />
          </span>
          <span className="absolute bottom-1 text-sm">Next</span>
        </button>
      </div>
    </div>
  );
}

export default MobileButtonWrapper;
