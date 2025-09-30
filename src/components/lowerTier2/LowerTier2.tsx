import { useState } from "react";
import LowerAddRow from "./LowerAddRow";
import LowerTab from "./LowerTab";
import ActiveContainer from "./ActiveContainer";

function LowerTier2() {
  const [activeTab, setActiveTab] = useState(-1);

  return (
    <div className="bg-neutral-600 w-full relative">
      <div className="absolute bottom-full left-2 flex gap-2">
        <LowerTab
          i={0}
          text="Add Sections"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/* <LowerTab
          i={1}
          text="Toggles"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        /> */}
      </div>
      <div className="flex">
        <ActiveContainer i={0} activeTab={activeTab}>
          <LowerAddRow />
        </ActiveContainer>
        {/* <ActiveContainer i={1} activeTab={activeTab}>
          <div>Test</div>
        </ActiveContainer> */}
      </div>
    </div>
  );
}

export default LowerTier2;
