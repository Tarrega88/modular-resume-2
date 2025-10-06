import { FiUnderline } from "react-icons/fi";
import MobileButton from "../MobileButton";
import MobileButtonRow from "../MobileButtonRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getSectionHeaderProps } from "@/utils/getProps";
import { toggleSectionHeaderUnderline } from "@/state/resumeSlice";

function HeaderButtonRow({ elementId }) {
  const data = useSelector((state: RootState) => state.resume.data);
  const dispatch = useDispatch();

  const headerData = elementId
    ? data.sectionHeaders[elementId]
    : getSectionHeaderProps("");

  const hasUnderline = headerData.underline;

  const underlineButtonStyle = hasUnderline
    ? "text-slate-800 hover:text-slate-600"
    : "text-gray-400 hover:text-slate-500";
  return (
    <MobileButtonRow>
      <MobileButton
        text="Toggle Underline"
        onClick={() =>
          dispatch(
            toggleSectionHeaderUnderline({
              id: elementId,
              underline: !hasUnderline,
            })
          )
        }
      >
        <FiUnderline className={underlineButtonStyle} />
      </MobileButton>
    </MobileButtonRow>
  );
}

export default HeaderButtonRow;
