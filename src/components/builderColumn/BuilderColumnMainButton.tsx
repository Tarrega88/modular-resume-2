type Props = {
  text?: string;
  children?: React.ReactNode;
  onClick(): void;
};

function BuilderColumnMainButton({ text, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-10 w-1/3 font-semibold rounded-sm px-3 py-1 bg-slate-100 text-slate-900 cursor-pointer outline-1 hover:outline-2 outline-sky-800 transition-all duration-50 shadow-lg"
    >
      {children ? children : text}
    </button>
  );
}

export default BuilderColumnMainButton;
