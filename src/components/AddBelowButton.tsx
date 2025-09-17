import { IoAddCircle } from "react-icons/io5";

type Props = {
  handleOnClick(): void;
};

function AddBelowButton({ handleOnClick }) {
  return (
    <button
      className="text-xl text-emerald-600 hover:text-emerald-500 cursor-pointer duration-200"
      onClick={handleOnClick}
    >
      <IoAddCircle />
    </button>
  );
}

export default AddBelowButton;
