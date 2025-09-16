import DynamicInput from "./DynamicInput";
import { useDispatch } from "react-redux";
import {
  editSectionHeader,
  toggleSectionHeaderUnderline,
} from "../state/resumeSlice";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { FiUnderline } from "react-icons/fi";
import { SectionHeaderProps } from "../state/types";
import RelativeAbsRight from "./wrappers/RelativeAbsRight";

function SectionHeader({
  text,
  kind,
  id,
  underline,
  renderIndex,
}: SectionHeaderProps & { renderIndex: number }) {
  const dispatch = useDispatch();
  function handleOnSubmit(text: string) {
    dispatch(editSectionHeader({ id, text }));
  }

  function handleToggleUnderline() {
    dispatch(toggleSectionHeaderUnderline({ id, underline: !underline }));
  }

  const underlineStyle = underline ? "border-b" : "";

  const underlineButtonStyle = underline
    ? "text-slate-800 hover:text-slate-600"
    : "text-gray-400 hover:text-slate-500";

  return (
    <div
      className={`text-lg font-semibold mt-4 mb-3 border-b-neutral-400 group ${underlineStyle}`}
    >
      <RelativeAbsRight hPosition="over">
        <FiUnderline
          className={`text-xl translate-y-1 ${underlineButtonStyle} transition-all duration-200`}
          onClick={handleToggleUnderline}
        />
      </RelativeAbsRight>
      <DynamicInput
        text={text}
        handleOnSubmit={handleOnSubmit}
        inputWidth="full"
        placeholderText="Enter Header Text"
      />
    </div>
  );
}

export default SectionHeader;
