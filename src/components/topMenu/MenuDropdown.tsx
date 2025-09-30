import { useNavigate } from "react-router-dom";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";

function MenuDropdown({ expanded, setExpanded, i }) {
  const navigate = useNavigate();

  return (
    <TopMenuDropdown
      title="Menu"
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Return Home" onClick={() => navigate("/")} />
    </TopMenuDropdown>
  );
}

export default MenuDropdown;
