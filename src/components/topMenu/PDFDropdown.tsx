import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import { useNavigate } from "react-router-dom";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop }) {
  function handleClick() {
    setExpanded(-1);
    toast("Generating PDF...");
    handlePrintDesktop();
  }

  const navigate = useNavigate();

  function handleMobilePDF() {
    navigate("/print");
  }

  return (
    <TopMenuDropdown
      title="PDF"
      i={0}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Desktop PDF" onClick={handleClick} />
      <TopMenuButton text="Mobile PDF" onClick={handleMobilePDF} />
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
