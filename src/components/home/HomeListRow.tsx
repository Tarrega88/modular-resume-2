import { useDispatch } from "react-redux";
import HomeListRowButton from "./HomeListRowButton";
import { copyResume } from "@/state/resumeSlice";
import { formatDate } from "@/utils/formatDate";

function HomeListRow({ text, createdAt, id }) {
  const date = new Date(createdAt);

  const formattedDate = formatDate(date);
  const dispatch = useDispatch();

  function handleCopyResume() {
    dispatch(copyResume({ originalId: id, newId: crypto.randomUUID() }));
  }

  return (
    <div className="text-slate-100 flex justify-between items-center px-1">
      <div>{formattedDate}</div>
      <div>{text}</div>
      <div className="flex gap-4">
        <HomeListRowButton text="Copy" onClick={handleCopyResume} />
      </div>
    </div>
  );
}

export default HomeListRow;
