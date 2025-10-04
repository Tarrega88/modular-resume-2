import MobileButton from "./MobileButton";
import { IoAddCircle, IoDuplicate } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { duplicateSection, removeResumeItem } from "@/state/resumeSlice";
import addDataFromKind from "@/utils/addDataFromKind";
import MobileButtonRow from "./MobileButtonRow";

function MobileWrappedTopRow({ activeIndex, setActiveIndex, kind }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeResumeItem({ renderIndex: activeIndex }));
  }

  function handleDuplicate() {
    const id = addDataFromKind(kind, dispatch);
    dispatch(
      duplicateSection({
        kind,
        elementId: id,
        index: activeIndex,
      })
    );
    setActiveIndex(activeIndex + 1);
  }

  return (
    <MobileButtonRow border="b">
      <MobileButton border="r" onClick={handleDuplicate}>
        <IoDuplicate className="text-sky-600" />
      </MobileButton>
      <MobileButton
        border="r"
        onClick={() => console.log("Under Construction")}
      >
        <div className="text-xs">Mobile Layout Under Construction</div>
      </MobileButton>
      <MobileButton onClick={handleDelete}>
        <IoAddCircle className="rotate-45 text-red-600 outline-0" />
      </MobileButton>
    </MobileButtonRow>
  );
}

export default MobileWrappedTopRow;
