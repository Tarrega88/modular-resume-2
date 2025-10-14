import { useNavigate } from "react-router-dom";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import TopMenuDynamicInput from "./TopMenuDynamicInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { toast } from "sonner";
import {
  changeResumeName,
  toggleOverlayMarginGuides,
  toggleShowDividers,
} from "@/state/resumeSlice";
import { useState } from "react";
import TopMenuOption from "./TopMenuOption";

function MenuDropdown({ expanded, setExpanded, i }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resumeMetaData, currentResumeId, showDividers, overlayMarginGuides } =
    useSelector((state: RootState) => state.resume);

  const { resumeName } = resumeMetaData[currentResumeId];

  const [tempText, setTempText] = useState(resumeName);

  function handleChangeName(text: string) {
    if (resumeName === text) return;
    dispatch(changeResumeName(text));
    if (text.length === 0) {
      toast("Resume name removed.");
    } else {
      toast.success(`Resume renamed to ${text}`);
    }
  }

  function handleOnChange(text: string) {
    if (text.length > 50) {
      toast("Resume name cannot be longer than 50 characters.");
    } else {
      setTempText(text);
    }
  }

  function handleToggleDividers() {
    dispatch(toggleShowDividers(!showDividers));
  }

  function handleToggleMarginOverlay() {
    dispatch(toggleOverlayMarginGuides(!overlayMarginGuides));
  }

  return (
    <TopMenuDropdown
      title="Menu"
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Return Home" onClick={() => navigate("/")} />
      <TopMenuDynamicInput
        text="Name Resume"
        tempText={tempText}
        handleSubmit={handleChangeName}
        handleOnChange={handleOnChange}
        placeholder="Name Resume"
      />
      <TopMenuOption
        text="Show Dividers"
        checked={showDividers}
        onClick={handleToggleDividers}
      />
      <TopMenuOption
        text="Margin Guides"
        checked={overlayMarginGuides}
        onClick={handleToggleMarginOverlay}
      />
    </TopMenuDropdown>
  );
}

export default MenuDropdown;
