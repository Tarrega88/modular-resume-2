import IconHelper from "./IconHelper";
import BuilderColumnTitle from "./BuilderColumnTitle";
import ResumeNamer from "./ResumeNamer";
import BuilderColumnMainButton from "./BuilderColumnMainButton";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HintBox from "./HintBox";

export default function BuilderColumn({
  handleOpenHelper,
}: {
  handleOpenHelper: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-700 border-r pb-16 sticky top-0 overflow-auto">
      <div className="flex flex-col gap-[1px]">
        <BuilderColumnTitle title="Modular Resume" />
        <ResumeNamer />
        <div className="flex w-full bg-blue-50 h-16 items-center px-3 justify-evenly">
          <BuilderColumnMainButton onClick={() => navigate("/")}>
            <IoMdHome className="text-2xl" />
          </BuilderColumnMainButton>
          <BuilderColumnMainButton
            text="Help"
            onClick={() => handleOpenHelper()}
          />
        </div>
        <IconHelper />
        <HintBox />
      </div>
    </div>
  );
}
