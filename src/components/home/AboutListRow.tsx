import { AboutLink } from "./AboutList";

function AboutListRow({ title, url, icon }: AboutLink) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 pl-2"
    >
      <div>{icon}</div>
      <div className="text-blue-600 underline hover:text-blue-500 transition-all duration-200">
        {title}
      </div>
    </a>
  );
}

export default AboutListRow;
