import { Kinds } from "@/state/types";

type Props = {
  text: string;
  children: React.ReactNode;
  handleOnClick(kind: Kinds): void;
  kind: Kinds;
};

function SimpleAddButton({ text, children, handleOnClick, kind }: Props) {
  return (
    <div
      className="text-sky-950 bg-sky-50 relative w-4/5 rounded-sm select-none cursor-pointer hover:bg-sky-100 transition-all duration-200 outline-1 outline-sky-500"
      onClick={() => handleOnClick(kind)}
    >
      <div className="font-semibold text-center h-10 flex items-center justify-center">
        {text}
      </div>
      <div className="text-sky-950 absolute right-3 top-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

export default SimpleAddButton;
