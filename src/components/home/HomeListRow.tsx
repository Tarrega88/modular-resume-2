import { useDispatch } from "react-redux";
import HomeListRowButton from "./HomeListRowButton";
import {
  copyResume,
  deleteResume,
  setCurrentResume,
} from "@/state/resumeSlice";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoDuplicate } from "react-icons/io5";
import { makeId } from "@/utils/makeId";

function HomeListRow({
  text,
  createdAt,
  id,
  odd,
  page,
  length,
  pageLength,
  setPage,
  maxPages,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCopyResume() {
    dispatch(copyResume({ originalId: id, newId: makeId() }));
  }

  function handleDelete() {
    dispatch(deleteResume(id));
    if ((length - 1) / pageLength === maxPages - 1 && page + 1 === maxPages) {
      setPage(page - 1);
    }
  }

  function handleContinue() {
    dispatch(setCurrentResume(id));
    navigate(`/builder/${id}`);
  }

  const colorStyle = odd
    ? "outline-slate-800"
    : "bg-slate-700 outline-slate-700";

  return (
    <div
      className={`text-slate-100 flex justify-between sm:grid sm:grid-cols-[200px_5fr_1fr] items-center p-2 ${colorStyle} rounded-sm outline-3`}
    >
      <div>{createdAt}</div>
      <div>{text}</div>
      <div className="flex gap-4 justify-end flex-wrap sm:flex-nowrap">
        <HomeListRowButton
          text="Continue"
          color="emerald"
          onClick={handleContinue}
        />
        <HomeListRowButton text="Copy" onClick={handleCopyResume} color="sky">
          <IoDuplicate />
        </HomeListRowButton>
        <HomeListRowButton text="Delete" onClick={handleDelete} color="red">
          <FaTrash />
        </HomeListRowButton>
      </div>
    </div>
  );
}

export default HomeListRow;
