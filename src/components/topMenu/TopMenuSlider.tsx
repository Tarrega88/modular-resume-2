function TopMenuSlider({ text, value, min, max, onChange, textAdd, step }) {
  const formattedText = textAdd ? `${text}${textAdd}` : text;

  return (
    <div className="transition-colors duration-150 flex flex-col items-center justify-between py-1 w-full bg-neutral-700 hover:bg-neutral-600">
      <div>{formattedText}</div>
      <input
        className="w-[90%] accent-neutral-300"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        type="range"
      />
    </div>
  );
}

export default TopMenuSlider;
