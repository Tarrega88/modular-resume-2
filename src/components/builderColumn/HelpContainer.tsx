import HelpSection from "./HelpSection";
import ModalWindow from "./ModalWindow";

function HelpContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Help & Info (Coming Soon)"
    >
      <HelpSection
        topic="Tutorials"
        text="Tutorials will soon be found on my YouTube channel at the link above."
        link="https://www.youtube.com/@anotherMichaelDev/playlists"
        linkName="YouTube"
      />
      <HelpSection
        topic="Email Me"
        text="Please e-mail me at michaelseedev@gmail.com with any suggestions or questions. I'm currently building out the help section and it helps to hear which parts of the application are confusing and which are not."
      />
    </ModalWindow>
  );
}

export default HelpContainer;
