type Props = {
  isOpen: boolean;
  setIsOpen(e: boolean): void;
  children: React.ReactNode;
};

function ModalWindow({ isOpen, setIsOpen, children }: Props) {
  const position = isOpen
    ? "left-1/2 -translate-x-1/2 outline-2"
    : "-translate-x-full left-0";

  return (
    <div
      className={`absolute bg-slate-600 outline-slate-300 size-3/5 ${position} transition-all duration-200 top-1/2 -translate-y-1/2 z-50`}
    >
      <div className="flex-col h-full p-4">
        <div className="flex justify-end pr-2">
          <button
            className="outline-1 text-slate-50 w-6 hover:bg-slate-500 transition-all duration-200 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
