import ModalWindow from "./builderColumn/ModalWindow";

function NameResumeWindow({ isOpen, setIsOpen }) {
  return (
    <ModalWindow title="Name Resume" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>Name Resume</div>
    </ModalWindow>
  );
}

export default NameResumeWindow;
