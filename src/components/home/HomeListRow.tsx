import HomeListRowButton from "./HomeListRowButton";

function HomeListRow({ text, createdAt }) {
  const date = new Date(createdAt);
  const dateString = date.toLocaleString();

  const fmt = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = fmt.format(date);

  return (
    <div className="text-slate-100 flex justify-between items-center px-1">
      <div>{formattedDate}</div>
      <div>{text}</div>
      <div className="flex gap-4">
        <HomeListRowButton text="Copy" />
      </div>
    </div>
  );
}

export default HomeListRow;
