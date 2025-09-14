import GenerateResumeButton from "@/components/GenerateResumeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Link } from "react-router-dom";

export default function HomePage() {
  const resumes = useSelector((s: RootState) => s.resume.resumes);
  const ids = Object.keys(resumes);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Modular Resume</h1>
      <GenerateResumeButton />
      {ids.length > 0 && (
        <div>
          <h2 className="mt-4 font-medium">Existing resumes</h2>
          <ul className="list-disc pl-6">
            {ids.map((id) => (
              <li key={id}>
                <Link className="text-blue-600 underline" to={`/builder/${id}`}>
                  {id}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
