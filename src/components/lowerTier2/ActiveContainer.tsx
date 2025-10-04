function ActiveContainer({ i, activeTab, children }) {
  const active = i === activeTab;

  return (
    <div className="transition-all duration-300 h-full w-full">
      {active ? children : null}
    </div>
  );
}

export default ActiveContainer;
