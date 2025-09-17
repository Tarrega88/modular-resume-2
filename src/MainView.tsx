import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/builderColumn/BuilderColumn";
import SideResume from "@/components/SideResume";

export default function MainView() {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div>
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
