import FilterButton from "./FilterButton";

//filter

function FilterRow() {
  return (
    <div className="flex">
      <FilterButton text="Jobs" />
      <FilterButton text="Bullets" />
      <FilterButton text="Skills" />
      <FilterButton text="Projects" />
      {/* <FilterButton text="Bullets" /> */}
    </div>
  );
}

export default FilterRow;
