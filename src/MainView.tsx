import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import SideResume from "@/components/resume/SideResume";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import TopMenu from "./components/topMenu/TopMenu";
import BottomRibbon from "./components/topMenu/BottomRibbon";
import HelpContainer from "./components/builderColumn/HelpContainer";
import PDFInformation from "./components/modals/PDFInformation";

export default function MainView() {
  const { currentResumeId, resumeMetaData, resumes } = useSelector(
    (state: RootState) => state?.resume
  );

  const length = resumes[currentResumeId].length;

  const [activeIndex, setActiveIndex] = useState(1); //should start as -1 probably, or 0?

  // const [prevActiveIndex, setPrevActiveIndex] = useState(1);

  //TODO 10/23/2025: Review this useEffect - it's not working properly for the activeIndex on deletion
  useEffect(() => {
    if (activeIndex >= length) setActiveIndex(length - 1);
  }, [length]);

  const pageStyle = resumeMetaData[currentResumeId]?.pageStyle || "Letter";
  const contentRef = useRef<HTMLDivElement>(null);
  const formattedPageStyle = `@page { size: ${pageStyle} portrait; margin: 0 }`;

  const desktopPrint = useReactToPrint({
    contentRef,
    pageStyle: formattedPageStyle,
    preserveAfterPrint: true,
  });

  const [expanded, setExpanded] = useState(-1);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [pdfIsOpen, setPdfIsOpen] = useState(false);

  function handleOpenHelper() {
    setHelpIsOpen(!helpIsOpen);
  }

  function handlePrint() {
    desktopPrint();
  }

  function handleOpenPDFInfo() {
    setPdfIsOpen(!pdfIsOpen);
  }

  // function handleSetExpanded(e: number) {
  //   // if ((e > -1 && activeIndex > -1) || (e === -1 && activeIndex < 0)) {
  //   //   setActiveIndex(-activeIndex);
  //   // }
  //   setExpanded(e);
  // }

  return (
    <div className="h-auto">
      <div className="grid grid-cols-1 w-full bg-slate-700">
        <div className="w-full bg-gray-500 flex flex-col items-center">
          <TopMenu
            expanded={expanded}
            setExpanded={setExpanded}
            handlePrintDesktop={handlePrint}
            handleOpenHelper={handleOpenHelper}
            handleOpenPDFInfo={handleOpenPDFInfo}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <div className="h-dvh overflow-auto px-5 pt-5 w-full flex justify-center">
            <SideResume
              contentRef={contentRef}
              expanded={expanded}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          <BottomRibbon
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <HelpContainer isOpen={helpIsOpen} setIsOpen={setHelpIsOpen} />
          <PDFInformation isOpen={pdfIsOpen} setIsOpen={handleOpenPDFInfo} />
        </div>
      </div>
    </div>
  );
}
