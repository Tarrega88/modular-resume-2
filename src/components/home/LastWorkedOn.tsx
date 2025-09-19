import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useNavigate } from "react-router-dom";

function LastWorkedOn() {
  const { currentResumeId } = useSelector((state: RootState) => state.resume);

  const navigate = useNavigate();

  return (
    <div className="py-3">
      <button
        className="bg-sky-500 shadow-lg text-white font-semibold px-3 py-1 rounded-sm outline-1 outline-sky-100 hover:bg-sky-400 transiton-all duration-200 cursor-pointer h-10"
        onClick={() => navigate(`/builder/${currentResumeId}`)}
      >
        Continue Last Resume
      </button>
    </div>
  );
}

export default LastWorkedOn;
