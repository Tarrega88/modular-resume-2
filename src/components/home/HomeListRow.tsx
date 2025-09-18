import HomeListRowButton from "./HomeListRowButton";

function HomeListRow({ text }) {
  return (
    <div className="text-slate-100 flex justify-between items-center px-1">
      <div>{text}</div>
      <div className="flex gap-4">
        <HomeListRowButton text="Rename" />
        <HomeListRowButton text="Copy" />
      </div>
    </div>
  );
}

export default HomeListRow;
