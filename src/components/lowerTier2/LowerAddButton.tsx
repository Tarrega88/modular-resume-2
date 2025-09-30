import { Kinds } from "@/state/types";

type Props = {
  text: string;
  children: React.ReactNode;
  kind: Kinds;
  onClick(kind: Kinds, text: string): void;
};

function LowerAddButton({ text, children, kind, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(kind, text)}
      className="flex justify-between items-center w-30 bg-stone-500 hover:bg-neutral-400 rounded-sm transition-all duration-200 cursor-pointer px-2 h-8"
    >
      <span>{text}</span>
      <span>{children ? children : null}</span>
    </button>
  );
}

export default LowerAddButton;
