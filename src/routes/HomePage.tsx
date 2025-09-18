import GenerateResumeButton from "@/components/GenerateResumeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeListRow from "@/components/ResumeListRow";

export default function HomePage() {
  const resumes = useSelector((s: RootState) => s.resume.resumes);
  const ids = Object.keys(resumes);

  return (
    <div className="p-6 space-y-4 h-screen bg-gradient-to-br">
      <h1 className="text-2xl font-semibold">Modular Resume</h1>
      <GenerateResumeButton />
      {ids.length > 0 && (
        <div>
          <h2 className="mt-4 font-medium">Existing resumes</h2>
          <ul className="list-disc pl-6">
            {ids.map((id) => (
              <li key={id}>
                <ResumeListRow id={id} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
