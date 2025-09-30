import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/routes/HomePage";
import BuilderPage from "@/routes/BuilderPage";
import DevToolbar from "./components/DevToolbar";
import { Toaster } from "sonner";
import PrinterPageA4 from "./routes/PrinterPageA4";
import PrinterPageLetter from "./routes/PrinterPageLetter";

export default function App() {
  return (
    <>
      <DevToolbar />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder/:resumeId" element={<BuilderPage />} />
        <Route path="/print/a4" element={<PrinterPageA4 />} />
        <Route path="/print/letter" element={<PrinterPageLetter />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
