import ModalWindow from "../builderColumn/ModalWindow";

function AboutContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="About"
    >
      <div>Test</div>
    </ModalWindow>
  );
}

export default AboutContainer;
