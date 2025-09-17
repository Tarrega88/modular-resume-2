import { duplicateSection } from "../../state/resumeSlice";
import { Kinds } from "../../state/types";
import { IoDuplicate } from "react-icons/io5";
import { useDispatch } from "react-redux";
import addDataFromKind from "@/utils/addDataFromKind";

function DuplicateButton({
  kind,
  renderIndex,
}: {
  kind: Kinds;
  renderIndex: number;
}) {
  const dispatch = useDispatch();
  function handleDuplicate() {
    const id = addDataFromKind(kind, dispatch);

    dispatch(
      duplicateSection({
        kind,
        elementId: id,
        index: renderIndex,
      })
    );
  }

  return (
    <button
      tabIndex={-1}
      onClick={handleDuplicate}
      className="text-xl cursor-pointer text-sky-600 transition-all duration-200 hover:text-sky-500"
    >
      <IoDuplicate />
    </button>
  );
}

export default DuplicateButton;
