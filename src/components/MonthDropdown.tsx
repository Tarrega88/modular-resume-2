function MonthDropdown({
  month,
  monthDisplay,
  handleOnChange,
  showDropdown,
  handleShowDropdown,
}: {
  month: number;
  monthDisplay: string[];
  handleOnChange(e: any): void;
  showDropdown: boolean;
  handleShowDropdown(e: boolean): void;
}) {
  return showDropdown ? (
    <div onMouseLeave={() => handleShowDropdown(false)}>
      <select
        className="outline-none"
        value={month}
        onChange={(e) => handleOnChange(e.target.value)}
        onMouseLeave={() => handleShowDropdown(false)}
      >
        {monthDisplay.map((e, i) => (
          <option key={i} value={i}>
            {e}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div onMouseEnter={() => handleShowDropdown(true)}>
      {monthDisplay[month]}
    </div>
  );
}

export default MonthDropdown;
