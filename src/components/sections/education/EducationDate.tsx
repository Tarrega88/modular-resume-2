import { useDispatch, useSelector } from "react-redux";
import MonthDropdown from "@/components/sections/misc/MonthDropdown";
import { RootState } from "@/state/store";
import { longMonths, months } from "@/utils/months";
import { useState } from "react";
import { editEducationDate } from "@/state/resumeSlice";
import DynamicInput from "@/components/sections/misc/DynamicInput";

type Props = {
  id: string;
  monthEnded: number;
  yearEnded: number;
};

function EducationDate({ id, monthEnded, yearEnded }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { monthType } = useSelector((state: RootState) => state.resume);

  const monthDisplay = monthType === "short" ? months : longMonths;

  function handleOnChangeMonth(month: number) {
    setShowDropdown(false);
    dispatch(editEducationDate({ id, field: "monthEnded", value: month }));
  }

  function handleShowDropdownMonth(bool: boolean) {
    setShowDropdown(bool);
  }

  return (
    <div>
      <div className="flex gap-1">
        <MonthDropdown
          month={monthEnded}
          monthDisplay={monthDisplay}
          handleOnChange={handleOnChangeMonth}
          showDropdown={showDropdown}
          handleShowDropdown={handleShowDropdownMonth}
        />
        <DynamicInput
          text={yearEnded.toString()}
          handleOnSubmit={(text: string) =>
            dispatch(
              editEducationDate({ id, field: "yearEnded", value: Number(text) })
            )
          }
          inputWidth="char"
          placeholderText="Year"
        />
      </div>
    </div>
  );
}

export default EducationDate;
