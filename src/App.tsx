import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/routes/HomePage";
import BuilderPage from "@/routes/BuilderPage";
import DevToolbar from "./components/DevToolbar";
import { Toaster } from "sonner";
import PrintPage from "./routes/PrinterPage";

export default function App() {
  return (
    <>
      <DevToolbar />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder/:resumeId" element={<BuilderPage />} />
        <Route path="/print" element={<PrintPage />} /> {/* new */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
