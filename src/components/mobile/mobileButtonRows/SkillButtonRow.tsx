import { MdLabel } from "react-icons/md";
import MobileButtonRow from "../MobileButtonRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getSkillProps } from "@/utils/getProps";
import MobileButton from "../MobileButton";
import { setShowCategory } from "@/state/resumeSlice";

function SkillButtonRow({ elementId }) {
  const data = useSelector((state: RootState) => state.resume.data);
  const dispatch = useDispatch();

  const skillData = elementId ? data.skills[elementId] : getSkillProps("");

  const showCategory = skillData.showCategory;

  const labelColor = showCategory
    ? "text-sky-500 hover:text-sky-400"
    : "text-gray-300 hover:text-sky-300";

  return (
    <MobileButtonRow>
      <MobileButton
        text="Toggle Category"
        onClick={() =>
          dispatch(
            setShowCategory({ id: elementId, showCategory: !showCategory })
          )
        }
      >
        <MdLabel className={labelColor} />
      </MobileButton>
    </MobileButtonRow>
  );
}

export default SkillButtonRow;
