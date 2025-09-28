import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";
import MobileNotification from "./components/absoluteUI/MobileNotification";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

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

  return (
    <div>
      <MobileNotification />
      <div className="flex w-full h-[100dvh]">
        <BuilderColumn onPrint={handlePrint} />
        <div className="overflow-auto w-full bg-gray-500 pt-5 px-5 grid items-start justify-items-center">
          <SideResume contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
}

//h-[100dvh]
