import ModalWindow from "../builderColumn/ModalWindow";
import UpdateInfo from "./UpdateInfo";

function UpdateContainer({ isOpen, setIsOpen }) {
  return (
    <ModalWindow
      isOpen={isOpen}
      setIsOpen={() => setIsOpen(false)}
      title="Updates"
    >
      <UpdateInfo />
    </ModalWindow>
  );
}

export default UpdateContainer;
