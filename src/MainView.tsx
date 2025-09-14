import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import BuilderColumn from "@/components/BuilderColumn";
import SideResume from "@/components/SideResume";

export default function MainView() {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className="flex h-[100dvh] w-full">
      <BuilderColumn onPrint={handlePrint} />
      <div className="flex-1 overflow-auto w-full bg-gray-500 pt-5 px-5 grid items-start justify-items-center">
        <SideResume contentRef={contentRef} />
      </div>
    </div>
  );
}
