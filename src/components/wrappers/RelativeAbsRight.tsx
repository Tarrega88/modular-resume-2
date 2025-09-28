import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
//Note: add the className "group" to any parent of this
function RelativeAbsRight({
  children,
  hPosition,
  vPosition = "high",
}: {
  children: React.ReactNode;
  hPosition: "over" | "close" | "normal" | "far";
  vPosition?: "high" | "med" | "low";
}) {
  const hPositions = {
    over: 104,
    close: 69,
    normal: 50,
    far: 12,
  };

  const vPositions = {
    high: 0,
    med: 32,
    low: 60,
  };

  const { resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );

  const { margin } = resumeMetaData[currentResumeId];

  const marginStyle =
    margin === 100
      ? "-translate-x-[100px]"
      : margin === 75
      ? "-translate-x-[50px]"
      : "";

  const pageWidth =
    resumeMetaData[currentResumeId].pageStyle === "A4" ? 827 : 850;

  return (
    <div
      style={{ width: pageWidth }}
      className={`relative ${marginStyle} print:hidden`}
      tabIndex={-1}
    >
      <div
        style={{
          right: `${hPositions[hPosition]}px`,
          top: `${vPositions[vPosition]}px`,
        }}
        className="absolute group-hover:opacity-100 opacity-0 transition-all duration-150"
      >
        {children}
      </div>
    </div>
  );
}

export default RelativeAbsRight;
