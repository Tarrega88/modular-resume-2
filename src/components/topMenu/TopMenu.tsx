import { useEffect, useRef, useState } from "react";
import FormattingDropdown from "./FormattingDropdown";
import FontDropdown from "./FontDropdown";
import PDFDropdown from "./PDFDropdown";

type Props = {
  expanded: number;
  setExpanded: (v: number) => void;
  handlePrintDesktop(): void;
};

function TopMenu({ expanded, setExpanded, handlePrintDesktop }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const [expandedBranch, setExpandedBranch] = useState(-1);

  useEffect(() => {
    setExpandedBranch(-1);
  }, [expanded]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!barRef.current?.contains(t)) {
        setExpanded(-1);
        setExpandedBranch(-1);
      }
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      } as any);
  }, [setExpanded]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(-1);
        setExpandedBranch(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [setExpanded]);

  return (
    <div className="sticky top-0 w-full z-50 bg-neutral-700 text-white pb-1">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div ref={barRef} className="flex bg-neutral-700 text-white w-full">
            <PDFDropdown
              expanded={expanded}
              setExpanded={setExpanded}
              handlePrintDesktop={handlePrintDesktop}
            />
            <FormattingDropdown
              expanded={expanded}
              setExpanded={setExpanded}
              expandedBranch={expandedBranch}
              setExpandedBranch={setExpandedBranch}
            />
            <FontDropdown
              expanded={expanded}
              setExpanded={setExpanded}
              expandedBranch={expandedBranch}
              setExpandedBranch={setExpandedBranch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
