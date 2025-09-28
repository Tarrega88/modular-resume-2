import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";
import MobileNotification from "./components/absoluteUI/MobileNotification";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import TopMenu from "./components/topMenu/TopMenu";

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
      <div className="flex w-full h-[100dvh]">
        <BuilderColumn onPrint={handlePrint} />
        <div className="overflow-auto w-full bg-gray-500 flex flex-col items-center relative">
          <TopMenu expanded={expanded} setExpanded={setExpanded} />
          <div className="px-5 pt-5">
            <SideResume contentRef={contentRef} expanded={expanded} />
          </div>
        </div>
      </div>
    </div>
  );
}

//h-[100dvh]
