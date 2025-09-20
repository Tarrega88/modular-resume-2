import { HelpTopic } from "./HelpContainer";

function HelpSection({
  topic,
  text,
  link,
  linkName,
  children,
  scale,
  contentHeight,
}: HelpTopic) {
  const scales = {
    "25": "scale-25",
    "50": "scale-50",
    "75": "scale-75",
    "100": "scale-100",
  };

  const scaleStyle = scale ? scales[scale] : "";

  return (
    <div className="flex flex-col text-slate-950 pr-5 pl-2">
      <div className="flex justify-between">
        <div className="font-semibold underline">{topic}</div>
        <a
          className="text-blue-600 underline hover:text-blue-400 transition-all duration-200"
          target="_blank"
          rel="noopener noreferrer"
          href={link}
        >
          {linkName}
        </a>
      </div>
      <div className="pl-2 pt-3">{text}</div>
      {children ? (
        <div
          style={{ height: `${contentHeight}px` }}
          className={`${scaleStyle} pointer-events-none origin-top-left pt-12`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default HelpSection;
