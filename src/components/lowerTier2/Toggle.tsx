import { useId } from "react";

function Toggle({ text, checked, onChange }) {
  const id = useId();

  return (
    <div className="flex justify-between gap-2 pr-4">
      <label htmlFor={id} className="cursor-pointer w-max">
        {text}
      </label>
      <input
        className="cursor-pointer"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default Toggle;
