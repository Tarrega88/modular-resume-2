type Props = {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange(e: any): void;
  oddOrEven: "odd" | "even";
  displayMult: number;
};

function Slider({
  title,
  min,
  max,
  step,
  value,
  onChange,
  oddOrEven,
  displayMult,
}) {
  const colors = {
    odd: "bg-blue-400",
    even: "bg-blue-500",
  };

  const wrapperColor = colors[oddOrEven];
  return (
    <div
      className={`w-full flex items-center flex-col gap-2 ${wrapperColor} text-slate-950 py-2 border-b`}
    >
      <div className="w-full text-center py-1">{title}</div>
      <input
        className="accent-slate-800 cursor-pointer w-5/6"
        type="range"
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        value={value}
      />
      <div>{Math.floor(value * displayMult)}%</div>
    </div>
  );
}

export default Slider;
