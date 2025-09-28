import { useDispatch, useSelector } from "react-redux";
import DropdownBranch from "./DropdownBranch";
import TopMenuDropdown from "./TopMenuDropdown";
import TopMenuOption from "./TopMenuOption";
import {
  editMargin,
  editMeasurementStyle,
  editPageStyle,
} from "@/state/resumeSlice";
import { RootState } from "@/state/store";

const measurements = {
  imperial: { 50: '1/2"', 75: '3/4"', 100: '1"' },
  metric: { 50: "1.27 cm", 75: "1.905 cm", 100: "2.54 cm" },
};

function FormattingDropdown({
  expanded,
  setExpanded,
  expandedBranch,
  setExpandedBranch,
}) {
  const { resumeMetaData, currentResumeId, measurementStyle } = useSelector(
    (state: RootState) => state.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";
  const margin = resumeMetaData[currentResumeId]?.margin || 75;

  const dispatch = useDispatch();

  function handleSetPageSize(size: "A4" | "Letter") {
    dispatch(editPageStyle(size));
  }

  function handleSetMeasuringSystem(measurement: "imperial" | "metric") {
    dispatch(editMeasurementStyle(measurement));
  }

  function handleSetMargin(margin: 50 | 75 | 100) {
    dispatch(editMargin({ margin }));
  }

  return (
    <TopMenuDropdown
      i={0}
      expanded={expanded}
      setExpanded={setExpanded}
      title="Formatting"
    >
      <DropdownBranch
        title="Page Size"
        i={0}
        expanded={expandedBranch}
        setExpanded={setExpandedBranch}
      >
        <TopMenuOption
          text="A4"
          onClick={() => handleSetPageSize("A4")}
          checked={pageStyle === "A4"}
        />
        <TopMenuOption
          text="Letter"
          onClick={() => handleSetPageSize("Letter")}
          checked={pageStyle === "Letter"}
        />
      </DropdownBranch>
      <DropdownBranch
        title="Measurement"
        i={1}
        expanded={expandedBranch}
        setExpanded={setExpandedBranch}
      >
        <TopMenuOption
          text="Imperial"
          onClick={() => handleSetMeasuringSystem("imperial")}
          checked={measurementStyle === "imperial"}
        />
        <TopMenuOption
          text="Metric"
          onClick={() => handleSetMeasuringSystem("metric")}
          checked={measurementStyle === "metric"}
        />
      </DropdownBranch>
      <DropdownBranch
        title="Margins"
        i={2}
        expanded={expandedBranch}
        setExpanded={setExpandedBranch}
      >
        <TopMenuOption
          text={measurements[measurementStyle][50]}
          onClick={() => handleSetMargin(50)}
          checked={margin === 50}
        />
        <TopMenuOption
          text={measurements[measurementStyle][75]}
          onClick={() => handleSetMargin(75)}
          checked={margin === 75}
        />
        <TopMenuOption
          text={measurements[measurementStyle][100]}
          onClick={() => handleSetMargin(100)}
          checked={margin === 100}
        />
      </DropdownBranch>
    </TopMenuDropdown>
  );
}

export default FormattingDropdown;
