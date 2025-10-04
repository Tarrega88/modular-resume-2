type Props = {
  children: React.ReactNode;
  border?: "b" | "t";
};

function MobileButtonRow({ children, border }: Props) {
  const borders = {
    b: "border-b",
    t: "border-t",
  };

  const borderStyle = border ? borders[border] : "";

  return (
    <div className="h-1/2">
      <div className={`flex h-full ${borderStyle}`}>{children}</div>
    </div>
  );
}

export default MobileButtonRow;
