import GenerateResumeButton from "@/components/GenerateResumeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeListRow from "@/components/home/ResumeListRow";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSelect from "@/components/home/HomeSelect";

export default function HomePage() {
  const resumes = useSelector((s: RootState) => s.resume.resumes);
  const ids = Object.keys(resumes);

  return (
    <div className="h-screen bg-slate-800">
      <HomeHeader title="Modular Resume" />
      <HomeSelect />
      {ids.length > 0 && (
        <div>
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
