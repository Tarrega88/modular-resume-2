type Props = {
  topic: string;
  text: string;
  link?: string;
  linkName?: string;
};

function HelpSection({ topic, text, link, linkName }: Props) {
  return (
    <div className="flex flex-col text-slate-950">
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
    </div>
  );
}

export default HelpSection;
