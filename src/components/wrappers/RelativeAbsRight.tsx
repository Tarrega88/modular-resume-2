import { pageWidth } from "@/components/SideResumeInner";
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
    close: 70,
    normal: 50,
    far: 12,
  };

  const vPositions = {
    high: 0,
    med: 32,
    low: 60,
  };

  return (
    <div
      style={{ width: pageWidth }}
      className="relative"
      tabIndex={-1}
      // className="-translate-x-[48px]"
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
