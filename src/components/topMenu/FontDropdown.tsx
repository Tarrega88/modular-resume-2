import { useDispatch, useSelector } from "react-redux";
import { SANS_OPTIONS, DEFAULT_SANS } from "@/config/fonts";
import DropdownBranch from "./DropdownBranch";
import TopMenuDropdown from "./TopMenuDropdown";
import TopMenuOption from "./TopMenuOption";
import { RootState } from "@/state/store";
import { editFont } from "@/state/resumeSlice";
import { useEffect } from "react";

const TARGET = "#resume-root";
function applyToResume(stack: string) {
  const el = document.querySelector(TARGET) as HTMLElement | null;
  if (el) el.style.setProperty("--font-sans", stack);
}

function FontDropdown({
  expanded,
  setExpanded,
  expandedBranch,
  setExpandedBranch,
}) {
  const dispatch = useDispatch();

  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state?.resume
  );

  const { font } = resumeMetaData[currentResumeId];
  const sans = SANS_OPTIONS.find((e) => e.label === font) ?? DEFAULT_SANS;

  function changeFont(e: string) {
    dispatch(editFont({ font: e }));
  }

  useEffect(() => {
    applyToResume(sans.stack);
  }, [font]);

  return (
    <TopMenuDropdown
      i={1}
      expanded={expanded}
      setExpanded={setExpanded}
      title="Font"
    >
      <DropdownBranch
        title="Fonts"
        i={0}
        expanded={expandedBranch}
        setExpanded={setExpandedBranch}
      >
        {SANS_OPTIONS.map((e, i) => (
          <TopMenuOption
            key={i}
            text={e.label}
            onClick={() => changeFont(e.label)}
            checked={e.label === font}
          />
        ))}
        {/* <TopMenuOption
          text="A4"
          onClick={() => handleChooseFont()}
          checked={true}
        /> */}
      </DropdownBranch>
    </TopMenuDropdown>
  );
}

export default FontDropdown;
