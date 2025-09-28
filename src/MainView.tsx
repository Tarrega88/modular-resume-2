import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";
import MobileNotification from "./components/absoluteUI/MobileNotification";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import TopMenu from "./components/topMenu/TopMenu";
import BottomRibbon from "./components/topMenu/BottomRibbon";

export default function MainView() {
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );

  const { pageStyle } = resumeMetaData[currentResumeId];

  const contentRef = useRef<HTMLDivElement>(null);

  const formattedPageStyle = `@page { size: ${pageStyle} portrait; margin: 0 }`;

  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: formattedPageStyle,
  });

  const [expanded, setExpanded] = useState(-1);

  return (
    <div>
      <MobileNotification />
      <div className="grid grid-cols-[280px_1fr] w-full h-full bg-slate-700">
        <BuilderColumn onPrint={handlePrint} />
        <div className="w-full bg-gray-500 flex flex-col items-center">
          <TopMenu expanded={expanded} setExpanded={setExpanded} />
          <div className="overflow-auto px-5 pt-5 w-full h-full flex justify-center">
            <SideResume contentRef={contentRef} expanded={expanded} />
          </div>
          {/* <div className="absolute bottom-0"> */}
          <BottomRibbon />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

//h-[100dvh]
