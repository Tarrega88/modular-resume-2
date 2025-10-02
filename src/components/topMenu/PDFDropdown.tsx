import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import { useNavigate } from "react-router-dom";
import { useCloudPdf } from "@/hooks/useCloudPdf";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop, i }) {
  const navigate = useNavigate();
  const cloudPdf = useCloudPdf();

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
      <TopMenuButton text="Cloud PDF (Testing)" onClick={cloudPdf} />
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
