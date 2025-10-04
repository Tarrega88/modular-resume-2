import { useState } from "react";
import MonthDropdown from "@/components/sections/misc/MonthDropdown";
import { longMonths, months } from "@/utils/months";
import { useDispatch } from "react-redux";
import { updatePrevJobField } from "@/state/resumeSlice";

function JobEnd({
  id,
  monthType,
  month,
}: {
  id: string;
  monthType: "short" | "long";
  month: number;
}) {
  const monthDisplay =
    monthType === "short" ? [...months, "Present"] : [...longMonths, "Present"];
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  function handleOnChange(month: number) {
    setShowDropdown(false);
    dispatch(updatePrevJobField({ id, field: "monthEnded", value: month }));
  }

  function handleShowDropdown(bool: boolean) {
    setShowDropdown(bool);
  }

  return (
    <div className="w-max hover:bg-sky-100">
      <MonthDropdown
        month={month}
        monthDisplay={monthDisplay}
        handleOnChange={handleOnChange}
        showDropdown={showDropdown}
        handleShowDropdown={handleShowDropdown}
      />
    </div>
  );
}

export default JobEnd;
