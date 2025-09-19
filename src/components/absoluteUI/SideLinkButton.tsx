import { IoIosLink } from "react-icons/io";

type Props = {
  handleOnClick(): void;
  active: boolean;
};

function SideLinkButton({ handleOnClick, active }: Props) {
  const color = active
    ? "text-blue-600 hover:text-blue-700"
    : "text-gray-400 hover:text-blue-400";

  return (
    <button className="text-xl" onClick={handleOnClick} tabIndex={-1}>
      <IoIosLink
        className={`${color} cursor-pointer transition-all duration-200`}
      />
    </button>
  );
}

export default SideLinkButton;
