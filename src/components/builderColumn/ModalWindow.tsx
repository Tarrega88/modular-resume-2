type Props = {
  isOpen: boolean;
  setIsOpen(e: boolean): void;
  children: React.ReactNode;
  title: string;
};

function ModalWindow({ isOpen, setIsOpen, children, title }: Props) {
  const position = isOpen
    ? "left-1/2 -translate-x-1/2 outline-2"
    : "-translate-x-[110%] left-0";

  return (
    <div
      className={`absolute bg-slate-50 size-3/5 ${position} transition-all duration-200 top-1/2 -translate-y-1/2 z-50 outline-3 outline-slate-900 overflow-auto`}
    >
      <div className="flex-col h-full p-4">
        <div className="flex justify-between pb-4">
          <div className="text-lg font-semibold">{title}</div>
          <button
            className="outline-1 text-slate-950 w-6 hover:outline-2 transition-all duration-50 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
