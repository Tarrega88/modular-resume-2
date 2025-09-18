type Props = {
  text: string;
  children: React.ReactNode;
  handleOnClick(): void;
};

function SimpleAddButton({ text, children, handleOnClick }: Props) {
  return (
    <div
      className="text-slate-50 bg-sky-800 relative w-4/5 rounded-sm select-none cursor-pointer hover:bg-sky-700 transition-all duration-200"
      onClick={handleOnClick}
    >
      <div className="font-semibold text-center h-10 flex items-center justify-center">
        {text}
      </div>
      <div className="text-slate-100 absolute right-3 top-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

export default SimpleAddButton;
