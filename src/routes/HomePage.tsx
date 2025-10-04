import HomeHeader from "@/components/home/HomeHeader";
import HomeSelect from "@/components/home/HomeSelect";

export default function HomePage() {
  return (
    <div className="h-dvh bg-slate-800">
      <HomeHeader title="Modular Resume" />
      <HomeSelect />
    </div>
  );
}
