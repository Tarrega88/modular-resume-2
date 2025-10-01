import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/routes/HomePage";
import BuilderPage from "@/routes/BuilderPage";
import DevToolbar from "./components/DevToolbar";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <DevToolbar />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder/:resumeId" element={<BuilderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
