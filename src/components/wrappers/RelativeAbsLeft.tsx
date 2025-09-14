import { pageWidth } from "../SideResumeInner";

function RelativeAbsLeft({
  children,
  hPosition,
  vPosition = "high",
}: {
  children: React.ReactNode;
  hPosition: "normal" | "bullet" | "far";
  vPosition?: "high" | "med" | "low";
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
  };

  return (
    <div
      style={{ width: pageWidth }}
      className="-translate-x-[48px] relative"
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
