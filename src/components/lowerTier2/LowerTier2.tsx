import { useState } from "react";
import LowerAddRow from "./LowerAddRow";
import LowerTab from "./LowerTab";
import ActiveContainer from "./ActiveContainer";
import LowerIconGuide from "./LowerIconGuide";

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
        <LowerTab
          i={1}
          text="Icon Guide"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="w-full">
        <ActiveContainer i={0} activeTab={activeTab} width="100%">
          <LowerAddRow />
        </ActiveContainer>
        <ActiveContainer i={1} activeTab={activeTab} width="100%">
          <LowerIconGuide />
        </ActiveContainer>
      </div>
    </div>
  );
}

export default LowerTier2;
