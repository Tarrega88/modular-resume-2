import { useEffect, useState } from "react";
import { toast } from "sonner";
import TopMenuButton from "./TopMenuButton";
import TopMenuDropdown from "./TopMenuDropdown";
import { useCloudPdf } from "@/hooks/useCloudPdf";

function PDFDropdown({ expanded, setExpanded, handlePrintDesktop, i }) {
  const cloudPdf = useCloudPdf();

  const COOLDOWN_MS = 15_000;
  const [until, setUntil] = useState<number>(0);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    if (now < until) {
      const t = setTimeout(() => setNow(Date.now()), 250);
      return () => clearTimeout(t);
    }
  }, [now, until]);

  const cooling = now < until;
  const remainingSec = cooling ? Math.ceil((until - now) / 1000) : undefined;

  function handleDesktopClick() {
    setExpanded(-1);
    toast("Generating PDF...");
    handlePrintDesktop();
  }

  async function handleCloudPdf() {
    if (cooling) return;
    setExpanded(-1);
    setUntil(Date.now() + COOLDOWN_MS);
    toast("Preparing PDF - Please Wait");
    try {
      await cloudPdf();
      toast.success("PDF download successful!");
    } catch (e: any) {
      const msg = String(e?.message || e);
      toast.error(`PDF Download failed: ${msg}`);
    }
  }

  return (
    <TopMenuDropdown
      title="PDF"
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <TopMenuButton text="View PDF" onClick={handleDesktopClick} />
      <TopMenuButton
        text="Cloud PDF"
        onClick={handleCloudPdf}
        disabled={cooling}
        countdownSec={remainingSec}
      />
    </TopMenuDropdown>
  );
}

export default PDFDropdown;
