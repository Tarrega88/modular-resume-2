function HelpWindow({ isOpen }) {
  const position = isOpen
    ? "left-1/2 -translate-x-1/2 outline-2"
    : "-translate-x-full left-0";

  return (
    <div
      className={`absolute bg-slate-600 outline-slate-300 size-3/5 ${position} transition-all duration-200 top-1/2 -translate-y-1/2 z-50`}
    ></div>
  );
}

export default HelpWindow;
