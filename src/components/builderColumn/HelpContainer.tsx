import HelpSection from "./HelpSection";
import ModalWindow from "./ModalWindow";

function HelpContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} title="Help & Info">
      <HelpSection
        topic="Tutorials"
        text="Tutorials will soon be found on my YouTube channel at the link above."
        link="https://www.youtube.com/@anotherMichaelDev/playlists"
        linkName="YouTube"
      />
      <HelpSection topic="Topic 2" text="More Text" />
    </ModalWindow>
  );
}

export default HelpContainer;
