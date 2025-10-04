type Props = {
  text?: string;
  children: React.ReactNode;
  onClick(): void;
  border?: "l" | "r";
};

function MobileButton({ text, children, onClick, border }: Props) {
  const borders = {
    l: "border-l",
    r: "border-r",
  };

  const borderStyle = border ? borders[border] : "";

  return (
    <button
      onClick={onClick}
      className={`h-full w-full flex items-center justify-center ${borderStyle} relative`}
    >
      {text ? <span className="absolute top-0 text-sm">{text}</span> : null}
      <span className="text-3xl">{children}</span>
    </button>
  );
}

export default MobileButton;
