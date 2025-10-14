function LowerTab({ text, i, activeTab, setActiveTab }) {
  const activeStyle = activeTab === i ? "bg-neutral-500" : "bg-neutral-600";

  return (
    <button
      onClick={() => (activeTab === i ? setActiveTab(-1) : setActiveTab(i))}
      className={`${activeStyle} px-2 py-1 rounded-t-lg border-t-2 border-x-2 border-neutral-400 cursor-pointer transition-all duration-150`}
    >
      <span className="rounded-sm px-1">{text}</span>
    </button>
  );
}

export default LowerTab;
