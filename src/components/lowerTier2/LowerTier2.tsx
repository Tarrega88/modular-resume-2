import { useState } from "react";
import LowerAddRow from "./LowerAddRow";
import LowerTab from "./LowerTab";
import ActiveContainer from "./ActiveContainer";
import LowerIconGuide from "./LowerIconGuide";
import LowerHints from "./LowerHints";
import MobileCommandStrip from "../mobile/MobileCommandStrip";

function LowerTier2({ activeIndex, setActiveIndex }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="bg-neutral-600 w-full relative">
      <div className="absolute bottom-full left-2 flex gap-2">
        <LowerTab
          i={0}
          text="Add Sections"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="sm:hidden block">
          <LowerTab
            i={1}
            text="Mobile"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <LowerTab
          i={2}
          text="Icon Guide"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <LowerTab
          i={3}
          text="Hints"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="w-full">
        <ActiveContainer i={0} activeTab={activeTab}>
          <LowerAddRow />
        </ActiveContainer>
        <ActiveContainer i={1} activeTab={activeTab}>
          <MobileCommandStrip
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </ActiveContainer>
        <ActiveContainer i={2} activeTab={activeTab}>
          <LowerIconGuide />
        </ActiveContainer>
        <ActiveContainer i={3} activeTab={activeTab}>
          <LowerHints />
        </ActiveContainer>
      </div>
    </div>
  );
}

export default LowerTier2;
