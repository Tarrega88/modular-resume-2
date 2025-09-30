function ActiveContainer({ i, activeTab, children, width }) {
  const active = i === activeTab;

  return (
    <div className="transition-all duration-300 h-full" style={{ width }}>
      {active ? children : null}
    </div>
  );
}

export default ActiveContainer;
