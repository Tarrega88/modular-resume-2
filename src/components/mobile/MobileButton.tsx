type Props = {
  children: React.ReactNode;
  onClick(): void;
  border?: "l" | "r";
};

function MobileButton({ children, onClick, border }: Props) {
  const borders = {
    l: "border-l",
    r: "border-r",
  };

  const borderStyle = border ? borders[border] : "";

  return (
    <button
      onClick={onClick}
      className={`h-full w-full flex items-center justify-center ${borderStyle}`}
    >
      <span className="text-3xl">{children}</span>
    </button>
  );
}

export default MobileButton;
