import Logo from "../builderColumn/Logo";

type Props = {
  title: string;
};

function HomeHeader({ title }: Props) {
  return (
    <div className="flex justify-start items-center bg-blue-50 border-b">
      <div className="py-5 pl-10 pr-4">
        <Logo />
      </div>
      <h1 className="text-2xl tracking-wide font-semibold text-slate-800">
        {title}
      </h1>
    </div>
  );
}

export default HomeHeader;
