import BuilderColumnTitle from "./BuilderColumnTitle";
import ResumeNamer from "./ResumeNamer";
import HintBox from "./HintBox";

export default function BuilderColumn() {
  return (
    <div className="w-full bg-slate-700 border-r pb-16 sticky top-0 overflow-auto">
      <div className="flex flex-col gap-[1px]">
        <BuilderColumnTitle title="Modular Resume" />
        <ResumeNamer />
        <HintBox />
      </div>
    </div>
  );
}
