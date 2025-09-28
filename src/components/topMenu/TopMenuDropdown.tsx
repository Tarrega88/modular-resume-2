function TopMenuDropdown({ title, i, expanded, setExpanded, children }) {
  const isExpanded = i === expanded;

  function handleMouseEnter() {
    if (expanded === -1) return;
    setExpanded(i);
  }

  const style = isExpanded ? "bg-neutral-600" : "bg-neutral-700";

  return (
    <div className={`relative ${style} rounded-md w-38`}>
      <button
        onMouseDown={() => setExpanded(i === expanded ? -1 : i)}
        className="p-1 w-full text-center px-6"
        onMouseEnter={handleMouseEnter}
      >
        <span>{title}</span>
      </button>
      <div className="absolute w-full pt-[2px]">
        {isExpanded ? children : null}
      </div>
    </div>
  );
}

export default TopMenuDropdown;
