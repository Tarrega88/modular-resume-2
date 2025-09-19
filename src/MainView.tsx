import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";
import MobileNotification from "./components/absoluteUI/MobileNotification";
import AbsoluteDropdown from "./components/absoluteUI/AbsoluteDropdown";

export default function MainView() {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  function testSet() {}

  return (
    <div>
      {/* <AbsoluteDropdown
        kind="bulletPoint"
        renderIndex={0}
        isExpanded={true}
        setIsExpanded={testSet}
      /> */}
      <MobileNotification />
      <div className="flex w-full h-[100dvh]">
        <BuilderColumn onPrint={handlePrint} />
        <div className="overflow-auto w-full bg-gray-500 pt-8 px-5 grid items-start justify-items-center">
          <SideResume contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
}

//h-[100dvh]
