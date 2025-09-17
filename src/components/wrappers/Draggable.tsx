import {
  dragResumeItem,
  setDragFromIndex,
  setDragHigher,
  setDragToIndex,
} from "../../state/resumeSlice";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import RelativeAbsLeft from "./RelativeAbsLeft";
import AddBelowButton from "../AddBelowButton";
import RelativeAbsRight from "./RelativeAbsRight";
import DeleteElementButton from "../DeleteElementButton";
import DuplicateButton from "../DuplicateButton";
import { Kinds } from "../../state/types";
import ComponentDropdown from "../ComponentDropdown";
import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

function Draggable({
  children,
  renderIndex,
  kind,
}: {
  children: React.ReactNode;
  renderIndex: number;
  kind: Kinds;
}) {
  const { dragFromIndex, dragToIndex, dragHigher } = useSelector(
    (state: RootState) => state.resume
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [addIsExpanded, setAddIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const dragDirection = dragHigher
    ? dragToIndex < renderIndex
    : dragToIndex <= renderIndex;

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    const a = document.activeElement as HTMLElement | null;
    if (a?.closest('input, textarea, select, [contenteditable="true"]')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch(setDragFromIndex(renderIndex));
  }

  function handleDragEnd() {
    dispatch(dragResumeItem());
    dispatch(setDragFromIndex(-1));
    dispatch(setDragToIndex(-1));
  }

  function handleDragEnter() {
    dispatch(setDragHigher(renderIndex < dragFromIndex ? false : true));
    dispatch(setDragToIndex(renderIndex));
  }

  const outerDragStyle =
    dragFromIndex === renderIndex ? "hover:opacity-25" : "hover:opacity-100";

  const dragStyle =
    dragFromIndex !== -1 && dragFromIndex !== renderIndex && dragDirection
      ? "translate-y-4"
      : "";

  return (
    <div className="group">
      <>
        {isExpanded && !addIsExpanded ? (
          <ComponentDropdown
            kind={kind}
            text="Replace section with..."
            renderIndex={renderIndex}
            setIsExpanded={setIsExpanded}
            isExpanded={isExpanded}
            replace={true}
          />
        ) : null}
        {addIsExpanded && !isExpanded ? (
          <ComponentDropdown
            kind={kind}
            text="Add new section"
            renderIndex={renderIndex}
            setIsExpanded={setAddIsExpanded}
            isExpanded={addIsExpanded}
            replace={false}
          />
        ) : null}
      </>
      <div
        draggable
        className={`${outerDragStyle} ${dragStyle} hover:outline-2 outline-sky-200 cursor-pointer rounded group transition-all duration-150 text-base`}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
      >
        <RelativeAbsLeft hPosition="far" vPosition="high">
          {isExpanded ? (
            <RxCaretUp
              className="text-xl"
              onClick={() => setIsExpanded(false)}
            />
          ) : (
            <RxCaretDown
              className="text-xl"
              onClick={() =>
                !addIsExpanded ? setIsExpanded(true) : setAddIsExpanded(false)
              }
            />
          )}
        </RelativeAbsLeft>
        <RelativeAbsLeft hPosition="normal">
          <DuplicateButton kind={kind} renderIndex={renderIndex} />
        </RelativeAbsLeft>
        <RelativeAbsRight hPosition="normal">
          <div className="flex gap-[1px]">
            <AddBelowButton
              handleOnClick={() =>
                !isExpanded ? setAddIsExpanded(true) : setIsExpanded(false)
              }
            />
            <DeleteElementButton renderIndex={renderIndex} />
          </div>
        </RelativeAbsRight>
        <div style={{ opacity: isExpanded ? 0 : 100 }}>{children}</div>
      </div>
    </div>
  );
}

export default Draggable;
