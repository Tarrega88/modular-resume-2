import Logo from "./Logo";

type Props = {
  title: string;
};

function BuilderColumnTitle({ title }: Props) {
  return (
    <div className="flex justify-center items-center bg-blue-50">
      <Logo />
      <div className="text-base sm:text-2xl tracking-wide font-semibold text-slate-800 pr-8 text-center">
        {title}
      </div>
    </div>
  );
}

export default BuilderColumnTitle;
