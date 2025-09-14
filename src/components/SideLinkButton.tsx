import { IoIosLink } from "react-icons/io";

type Props = {
  id: string;
  handleOnClick(): void;
  active: boolean;
};

function SideLinkButton({ id, handleOnClick, active }: Props) {
  const color = active
    ? "text-blue-600 hover:text-blue-700"
    : "text-gray-400 hover:text-blue-400";

  return (
    <button className="text-xl" onClick={handleOnClick}>
      <IoIosLink
        className={`${color} cursor-pointer transition-all duration-200`}
      />
    </button>
  );
}

export default SideLinkButton;
