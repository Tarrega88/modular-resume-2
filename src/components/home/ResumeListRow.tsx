import { copyResume, setCurrentResume } from "@/state/resumeSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  id: string;
};

function ResumeListRow({ id }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200">
      {/* <Link className="underline" to={`/builder/${id}`}>
        {id}
      </Link> */}
      <button
        onClick={() => {
          dispatch(setCurrentResume(id));
          navigate(`/builder/${id}`);
        }}
      >
        {id}
      </button>
      <button
        onClick={() =>
          dispatch(copyResume({ originalId: id, newId: crypto.randomUUID() }))
        }
      >
        Copy
      </button>
    </div>
  );
}

export default ResumeListRow;
