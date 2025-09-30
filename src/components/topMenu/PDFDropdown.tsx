import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop }) {
  function handleClick() {
    setExpanded(-1);
    toast("Generating PDF...");
    handlePrintDesktop();
  }

  const navigate = useNavigate();

  const { currentResumeId, resumeMetaData } = useSelector(
    (state: RootState) => state.resume
  );

  const pageStyle = resumeMetaData[currentResumeId].pageStyle || "Letter";

  function handleMobilePDF() {
    if (pageStyle === "A4") {
      navigate("/print/a4");
    } else {
      navigate("/print/letter");
    }
  }

  return (
    <TopMenuDropdown
      title="PDF"
      i={0}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="Desktop PDF" onClick={handleClick} />
      <TopMenuButton text="Mobile (Testing)" onClick={handleMobilePDF} />
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
