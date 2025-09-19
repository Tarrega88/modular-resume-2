import { useDispatch } from "react-redux";
import HomeListRowButton from "./HomeListRowButton";
import {
  copyResume,
  deleteResume,
  setCurrentResume,
} from "@/state/resumeSlice";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function HomeListRow({ text, createdAt, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCopyResume() {
    dispatch(copyResume({ originalId: id, newId: crypto.randomUUID() }));
  }

  function handleDelete() {
    dispatch(deleteResume(id));
  }

  function handleContine() {
    dispatch(setCurrentResume(id));
    navigate(`/builder/${id}`);
  }

  return (
    <div className="text-slate-100 flex justify-between items-center px-1">
      <div>{createdAt}</div>
      <div>{text}</div>
      <div className="flex gap-4">
        <HomeListRowButton
          text="Continue"
          color="sky"
          onClick={handleContine}
        />
        <HomeListRowButton text="Copy" onClick={handleCopyResume} color="sky" />
        <HomeListRowButton text="Delete" onClick={handleDelete} color="red">
          <FaTrash />
        </HomeListRowButton>
      </div>
    </div>
  );
}

export default HomeListRow;
