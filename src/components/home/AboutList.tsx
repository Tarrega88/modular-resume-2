import { FaGithub, FaUser, FaYoutube } from "react-icons/fa6";
import AboutListRow from "./AboutListRow";

export type AboutLink = {
  title: string;
  url: string;
  icon: React.ReactElement;
};

const links: AboutLink[] = [
  {
    title: "Portfolio",
    url: "https://michaelthedev.com/",
    icon: <FaUser />,
  },
  { title: "GitHub", url: "https://github.com/Tarrega88", icon: <FaGithub /> },
  {
    title: "YouTube",
    url: "https://www.youtube.com/@anotherMichaelDev",
    icon: <FaYoutube />,
  },
];

function AboutList() {
  return (
    <div className="flex flex-col gap-2 pb-4">
      {links.map((e, i) => (
        <AboutListRow key={i} title={e.title} url={e.url} icon={e.icon} />
      ))}
    </div>
  );
}

export default AboutList;
