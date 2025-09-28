import { useEffect, useState } from "react";
import TopMenuDropdown from "./TopMenuDropdown";
import DropdownBranch from "./DropdownBranch";
import TopMenuOption from "./TopMenuOption";
import { useDispatch, useSelector } from "react-redux";
import {
  editMargin,
  editMeasurementStyle,
  editPageStyle,
} from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import FormattingDropdown from "./FormattingDropdown";
import FontDropdown from "./FontDropdown";

//Top Menu:

//Formatting:
//Page Size: A4, Letter - DONE
//Measurement: Metric, Imperial - DONE
//Margin: Metric: 1.27 cm, 1.905 cm, 2.54 cm - DONE
//Margin: Imperial: 1/2", 3/4", 1" - DONE

//Not decided:
//Font: System Default, Arial (System), Helvetica (System),
//Lato, Noto Sans, Noto Serif, Open Sans, Roboto, Ubuntu
//Font Scaling (leave out? maybe leave font in side bar too?)

//Builder Column:
//View PDF, Zoom

function TopMenu({ expanded, setExpanded }) {
  const [expandedBranch, setExpandedBranch] = useState(-1);

  useEffect(() => {
    setExpandedBranch(-1);
  }, [expanded]);

  return (
    <div className="sticky top-0 w-full z-50">
      <div className="flex bg-neutral-700 text-white w-full">
        <FormattingDropdown
          expanded={expanded}
          setExpanded={setExpanded}
          expandedBranch={expandedBranch}
          setExpandedBranch={setExpandedBranch}
        />
        <FontDropdown
          expanded={expanded}
          setExpanded={setExpanded}
          expandedBranch={expandedBranch}
          setExpandedBranch={setExpandedBranch}
        />
      </div>
    </div>
  );
}

export default TopMenu;
