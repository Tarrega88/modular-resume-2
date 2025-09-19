type Props = {
  text: string;
  onClick(): void;
  color: "red" | "sky";
  children?: React.ReactNode;
};

function HomeListRowButton({ text, onClick, color, children }: Props) {
  const colors = {
    red: "bg-red-700",
    sky: "bg-sky-600",
  };

  const colorStyle = colors[color];

  return (
    <button
      className={`${colorStyle} px-2 py-1 rounded-sm cursor-pointer`}
      onClick={onClick}
    >
      {children ? children : text}
    </button>
  );
}

export default HomeListRowButton;
