import { useEffect, useState } from "react";
import FormattingDropdown from "./FormattingDropdown";
import FontDropdown from "./FontDropdown";
import LastSaved from "../builderColumn/LastSaved";

function TopMenu({ expanded, setExpanded }) {
  const [expandedBranch, setExpandedBranch] = useState(-1);

  useEffect(() => {
    setExpandedBranch(-1);
  }, [expanded]);

  return (
    <div className="sticky top-0 w-full z-50 bg-neutral-700 text-white h-10">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
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
      </div>
    </div>
  );
}

export default TopMenu;
