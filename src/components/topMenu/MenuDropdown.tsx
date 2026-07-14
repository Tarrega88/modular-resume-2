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
import { useRef, useState } from "react";
import TopMenuOption from "./TopMenuOption";
import {
  downloadResumeExport,
  importResumeFromFile,
  isResumeExportFile,
} from "@/utils/resumeIO";

function MenuDropdown({ expanded, setExpanded, i }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resumeState = useSelector((state: RootState) => state.resume);
  const { resumeMetaData, currentResumeId, showDividers, overlayMarginGuides } =
    resumeState;

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

  function handleExport() {
    downloadResumeExport(resumeState);
    toast.success("Resume exported.");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!isResumeExportFile(parsed)) {
          toast.error("That file isn't a valid resume export.");
          return;
        }
        const newResumeId = importResumeFromFile(parsed, dispatch);
        toast.success("Resume imported.");
        navigate(`/builder/${newResumeId}`);
      } catch {
        toast.error("Couldn't read that file as JSON.");
      }
    };
    reader.onerror = () => toast.error("Couldn't read that file.");
    reader.readAsText(file);
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
      <TopMenuButton text="Export JSON" onClick={handleExport} />
      <TopMenuButton text="Import JSON" onClick={handleImportClick} />
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={handleImportFile}
      />
    </TopMenuDropdown>
  );
}

export default MenuDropdown;
