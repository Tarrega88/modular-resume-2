type Props = {
  text: string;
  onClick(): void;
  color: "red" | "sky" | "emerald" | "pdf";
  children?: React.ReactNode;
};

function HomeListRowButton({ text, onClick, color, children }: Props) {
  const colors = {
    red: "bg-red-700 hover:bg-red-600",
    sky: "bg-sky-600 hover:bg-sky-500",
    emerald: "bg-emerald-600 hover:bg-emerald-500",
    pdf: "bg-transparent text-slate-200 outline-1 hover:bg-slate-500",
  };

  const colorStyle = colors[color];

  return (
    <button
      className={`${colorStyle} px-2 py-1 rounded-sm cursor-pointer transition-colors duration-200`}
      onClick={onClick}
    >
      {children ? children : text}
    </button>
  );
}

export default HomeListRowButton;
