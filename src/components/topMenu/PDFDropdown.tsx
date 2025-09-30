import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop }) {
  function handleDesktopClick() {
    setExpanded(-1);
    toast("Generating PDF...");
    handlePrintDesktop();
  }

  return (
    <TopMenuDropdown
      title="PDF"
      i={0}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Desktop PDF" onClick={handleDesktopClick} />
      {/* <TopMenuButton text="Mobile (Testing)" onClick={handleMobilePDF} /> */}
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
