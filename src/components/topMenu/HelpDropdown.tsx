import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";

function HelpDropdown({
  expanded,
  setExpanded,
  expandedBranch,
  setExpandedBranch,
  i,
  handleOpenHelp,
}) {
  function handleOnClick() {
    handleOpenHelp();
    setExpanded(-1);
  }

  return (
    <TopMenuDropdown
      title="Help"
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Help Window" onClick={handleOnClick} />
    </TopMenuDropdown>
  );
}

export default HelpDropdown;
