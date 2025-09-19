type Props = {
  text?: string;
  children?: React.ReactNode;
  onClick(): void;
};

function BuilderColumnMainButton({ text, children, onClick }: Props) {
  return (
    <button
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onClick={onClick}
      className="flex items-center justify-center h-10 w-1/3 font-semibold rounded-sm px-3 py-1 bg-slate-100 text-slate-900 cursor-pointer border outline-sky-800 hover:outline-1 border-sky-800 transition-all duration-50 shadow-lg"
    >
      {children ? children : text}
    </button>
  );
}

export default BuilderColumnMainButton;
