import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";
import MobileNotification from "./components/absoluteUI/MobileNotification";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import TopMenu from "./components/topMenu/TopMenu";
import BottomRibbon from "./components/topMenu/BottomRibbon";
import HelpContainer from "./components/builderColumn/HelpContainer";

export default function MainView() {
  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state?.resume
  );

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";
  const contentRef = useRef<HTMLDivElement>(null);
  const formattedPageStyle = `@page { size: ${pageStyle} portrait; margin: 0 }`;
  const handlePrintDesktop = useReactToPrint({
    contentRef,
    pageStyle: formattedPageStyle,
  });

  const [expanded, setExpanded] = useState(-1);
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  function handleOpenHelper() {
    setHelpIsOpen(!helpIsOpen);
  }

  function handlePrint() {
    handlePrintDesktop();
  }

  return (
    <div>
      <MobileNotification />
      <div className="grid grid-cols-[280px_1fr] w-full bg-slate-700 h-screen">
        <BuilderColumn handleOpenHelper={handleOpenHelper} />
        <div className="w-full bg-gray-500 flex flex-col items-center overflow-auto">
          <TopMenu
            expanded={expanded}
            setExpanded={setExpanded}
            handlePrintDesktop={handlePrint}
          />
          <div className="overflow-auto px-5 pt-5 w-full h-full flex justify-center">
            <SideResume contentRef={contentRef} expanded={expanded} />
          </div>
          <BottomRibbon />
          <HelpContainer isOpen={helpIsOpen} setIsOpen={setHelpIsOpen} />
        </div>
      </div>
    </div>
  );
}
