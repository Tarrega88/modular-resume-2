function RibbonSlider({
  value,
  onChange,
  min,
  max,
  step,
  children,
  mult,
  textAdd,
}) {
  return (
    <div className="flex gap-1 sm:gap-2 items-center pr-12 pt-1 sm:pt-0">
      <div>{children}</div>
      <input
        className="accent-neutral-300 w-24 sm:w-44"
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <div className="text-xs sm:text-base">
        {Math.floor(value * mult)}
        {textAdd ? textAdd : ""}
      </div>
    </div>
  );
}

export default RibbonSlider;
