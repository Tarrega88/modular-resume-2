import { pageWidth } from "@/components/SideResumeInner";
//Note: add the className "group" to any parent of this
function RelativeAbsRight({
  children,
  hPosition,
  vPosition = "high",
}: {
  children: React.ReactNode;
  hPosition: "normal" | "far";
  vPosition?: "high" | "low";
}) {
  const hPositions = {
    normal: 50,
    far: 12,
  };

  const vPositions = {
    high: 0,
    low: 32,
  };

  return (
    <div
      style={{ width: pageWidth }}
      className="relative"
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
