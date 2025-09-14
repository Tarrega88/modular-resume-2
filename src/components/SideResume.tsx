import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import SideResumeInner from "./SideResumeInner";

export default function SideResume({
  contentRef,
}: {
  contentRef: React.RefObject<HTMLDivElement>;
}) {
  const { scale } = useSelector((s: RootState) => s.resume);
  const decimalScale = scale / 100;

  return (
    <div
      style={{
        transform: `scale(${decimalScale})`,
        transformOrigin: "top left",
        width: `${850 * decimalScale}px`,
        height: `${1100 * decimalScale}px`,
      }}
    >
      <div ref={contentRef} data-print-root>
        <SideResumeInner />
      </div>
    </div>
  );
}
