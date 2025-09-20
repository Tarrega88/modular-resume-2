import ComponentDropdown from "../ComponentDropdown";
import ListOfKinds from "../ListOfKinds";
import HelpSection from "./HelpSection";
import ModalWindow from "./ModalWindow";

export type HelpTopic = {
  topic: string;
  text: string;
  link?: string;
  linkName?: string;
  children?: React.ReactNode;
  scale?: "25" | "50" | "75" | "100";
  contentHeight?: number;
};
const helpTopics: HelpTopic[] = [
  {
    topic: "Email",
    text: "E-mail me at michaelseedev@gmail.com with any suggestions or questions. I'm currently building out the help section and it helps to hear which parts of the application are confusing and which are not.",
  },
  {
    topic: "Tutorials",
    text: "Tutorials will soon be found on my YouTube channel at the link above.",
    link: "https://www.youtube.com/@anotherMichaelDev/playlists",
    linkName: "YouTube",
  },
  {
    topic: "Add & Replace Window",
    text: "The add & replace window allows you to view your previously made sections. You can add them to new resumes or replace other sections with them. Let's look at some of the different parts of this window.",
    scale: "50",
    contentHeight: 300,
    children: (
      <ComponentDropdown
        kind="divider"
        renderIndex={0}
        isExpanded={true}
        setIsExpanded={() => null}
      />
    ),
  },
  {
    topic: "List of Section Types",
    text: "After choosing whether you'd like to Add or Replace a section, choose which type of section you'd like to add to your document.",
    scale: "50",
    contentHeight: 100,
    children: (
      <div className="w-[754px] rounded-sm">
        <ListOfKinds setKind={() => null} kind="bulletPoint" />
      </div>
    ),
  },
];

function HelpContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Help & Info (Coming Soon)"
    >
      {isOpen ? (
        <>
          {helpTopics.map((e, i) => (
            <HelpSection
              key={i}
              topic={e.topic}
              text={e.text}
              link={e.link}
              linkName={e.linkName}
              scale={e.scale}
              contentHeight={e.contentHeight}
            >
              {e.children ? e.children : null}
            </HelpSection>
          ))}
        </>
      ) : null}
    </ModalWindow>
  );
}

export default HelpContainer;
