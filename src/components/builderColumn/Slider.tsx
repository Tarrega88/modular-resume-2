type Props = {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange(e: any): void;
  oddOrEven: "odd" | "even";
  displayMult: number;
  children?: React.ReactNode;
};

function Slider({
  title = "",
  min,
  max,
  step,
  value,
  onChange,
  oddOrEven,
  displayMult,
  children,
}: Props) {
  const colors = {
    odd: "bg-blue-400",
    even: "bg-blue-500",
  };

  const wrapperColor = colors[oddOrEven];
  return (
    <div
      className={`w-full flex items-center flex-col gap-2 ${wrapperColor} text-slate-950 pb-2 border-b pt-6`}
    >
      {title ? <div className="w-full text-center py-1">{title}</div> : null}
      <input
        className="accent-slate-800 cursor-pointer w-5/6"
        type="range"
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        value={value}
      />
      <div className="flex items-center gap-2">
        {children ? <div>{children}</div> : null}
        <div>{Math.floor(value * displayMult)}%</div>
      </div>
    </div>
  );
}

export default Slider;
