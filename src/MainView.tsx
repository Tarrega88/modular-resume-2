import BuilderColumn from "../src/components/BuilderColumn";
import SideResume from "../src/components/SideResume";

export default function MainView() {
  return (
    <div className="flex h-dvh w-full">
      <BuilderColumn />
      <div className="flex-1 overflow-auto w-full bg-gray-500 pt-5 px-5 grid items-start justify-items-center">
        <SideResume />
      </div>
    </div>
  );
}
