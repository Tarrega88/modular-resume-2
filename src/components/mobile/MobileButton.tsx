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
      className={`h-full w-full flex flex-col items-center justify-center ${borderStyle} gap-1 pt-2`}
    >
      <span className="text-3xl">{children}</span>
      {text ? <span className="text-xs">{text}</span> : null}
    </button>
  );
}

export default MobileButton;

/*
  <button
      onClick={onClick}
      className={`h-full w-full flex items-center justify-center ${borderStyle} relative`}
    >
      <span className="text-3xl">{children}</span>
      {text ? <span className="absolute text-xs bottom-1">{text}</span> : null}
    </button>
*/
