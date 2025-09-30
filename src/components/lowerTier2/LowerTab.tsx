function LowerTab({ text, i, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => (activeTab === i ? setActiveTab(-1) : setActiveTab(i))}
      className="bg-neutral-600 px-2 py-1 rounded-t-lg border-t-2 border-x-2 border-neutral-400 cursor-pointer transition-all duration-150"
    >
      <span className="rounded-sm px-1">{text}</span>
    </button>
  );
}

export default LowerTab;
