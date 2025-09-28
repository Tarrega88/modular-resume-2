import { editPageStyle } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

function PageStyle() {
  const dispatch = useDispatch();
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );
  const { pageStyle } = resumeMetaData[currentResumeId];

  const active = "bg-emerald-600 hover:bg-emerald-400 text-white";
  const inactive = "bg-gray-500 hover:bg-emerald-600 text-gray-300 opacity-75";

  const a4Style = pageStyle === "A4" ? active : inactive;
  const letterStyle = pageStyle === "Letter" ? active : inactive;

  return (
    <div>
      <div className="bg-blue-50 text-center font-semibold pt-1">Page Size</div>
      <div className="bg-blue-50 flex py-2 justify-center gap-4">
        <button
          className={`${a4Style} transition-all duration-150 cursor-pointer w-16 rounded-sm`}
          onClick={() => dispatch(editPageStyle("A4"))}
        >
          A4
        </button>
        <button
          className={`${letterStyle} transition-all duration-150 cursor-pointer w-16 rounded-sm`}
          onClick={() => dispatch(editPageStyle("Letter"))}
        >
          Letter
        </button>
      </div>
    </div>
  );
}

export default PageStyle;
