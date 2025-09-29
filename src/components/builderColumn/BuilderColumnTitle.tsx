import Logo from "./Logo";

type Props = {
  title: string;
};

function BuilderColumnTitle({ title }: Props) {
  return (
    <div className="flex justify-center items-center bg-blue-50">
      <div className="flex items-center justify-center pt-5 pb-4 pl-3 w-full">
        <Logo />
      </div>
      <div className="text-2xl tracking-wide font-semibold text-slate-800 pr-8 text-center">
        {title}
      </div>
    </div>
  );
}

export default BuilderColumnTitle;
