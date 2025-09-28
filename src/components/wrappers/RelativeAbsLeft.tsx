import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

function RelativeAbsLeft({
  children,
  hPosition,
  vPosition = "high",
}: {
  children: React.ReactNode;
  hPosition: "normal" | "bullet" | "far";
  vPosition?: "high" | "med" | "low" | "vLow";
}) {
  const hPositions = {
    normal: 22,
    bullet: 51,
    far: 2,
  };

  const vPositions = {
    high: 0,
    med: 32,
    low: 52,
    vLow: 50,
  };

  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );

  const pageWidth =
    resumeMetaData[currentResumeId].pageStyle === "A4" ? 827 : 850;

  return (
    <div
      style={{ width: pageWidth }}
      className="-translate-x-[50px] relative print:hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          left: `${hPositions[hPosition]}px`,
          top: `${vPositions[vPosition]}px`,
        }}
        className="absolute group-hover:opacity-100 opacity-0 transition-all duration-150"
      >
        {children}
      </div>
    </div>
  );
}

export default RelativeAbsLeft;
