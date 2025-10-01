import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import { useNavigate } from "react-router-dom";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop, i }) {
  const navigate = useNavigate();

  function handleDesktopClick() {
    setExpanded(-1);
    toast("Generating PDF...");
    handlePrintDesktop();
  }

  function handleMobilePDF() {
    navigate("/print");
  }

  return (
    <TopMenuDropdown
      title="PDF"
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="View PDF" onClick={handleDesktopClick} />
      <TopMenuButton text="Mobile (Testing)" onClick={handleMobilePDF} />
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
