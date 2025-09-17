import { useDispatch } from "react-redux";
import { removeResumeItem } from "../state/resumeSlice";
import { IoAddCircle } from "react-icons/io5";

function DeleteElementButton({ renderIndex }: { renderIndex: number }) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeResumeItem({ renderIndex }));
  }
  return (
    <button
      tabIndex={-1}
      className="text-red-600 text-xl cursor-pointer hover:text-red-500 duration-200"
      onClick={handleRemove}
    >
      <IoAddCircle className="rotate-45" />
    </button>
  );
}

export default DeleteElementButton;
