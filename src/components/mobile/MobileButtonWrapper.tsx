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
    <div className="bg-neutral-200 w-full flex items-center justify-between h-38 border-b text-neutral-950">
      <div className="flex flex-col h-full justify-end border-r w-24">
        <button
          onClick={handleMoveBack}
          className="size-full flex justify-center items-center border-b"
        >
          <span className="text-3xl">
            <TbArrowMoveUp />
          </span>
        </button>
        <button
          className="size-full flex justify-center items-center"
          onClick={() =>
            setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1)
          }
        >
          <span className="text-3xl">
            <IoIosArrowBack />
          </span>
        </button>
      </div>
      <div className="size-full">{children}</div>
      <div className="flex flex-col h-full justify-end border-l w-24">
        <button
          className="size-full flex justify-center items-center border-b"
          onClick={handleMoveForward}
        >
          <span className="text-3xl">
            <TbArrowMoveDown />
          </span>
        </button>
        <button
          className="size-full flex justify-center items-center"
          onClick={() => setActiveIndex((activeIndex + 1) % length)}
        >
          <span className="text-3xl">
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
}

export default MobileButtonWrapper;
