import { changeBulletPoint } from "../state/resumeSlice";
import { Kinds } from "../state/types";
import { useDispatch } from "react-redux";

type TempProps = {
  options?: any[];
  kind: Kinds;
  id: string;
  renderIndex: number;
  field?: string;
};

function DropdownElement({ options, kind, id, renderIndex, field }: TempProps) {
  const dispatch = useDispatch();

  function onChange(e: any) {
    dispatch(changeBulletPoint({ renderIndex, id: e.target.value }));
  }

  return (
    <select
      className="w-4 focus:outline-none cursor-pointer hover:text-gray-500 transition-all duration-150"
      onChange={onChange}
      value={id}
    >
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default DropdownElement;
