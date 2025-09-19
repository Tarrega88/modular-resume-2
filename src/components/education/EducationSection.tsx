import { EducationProps } from "../../state/types";
import DynamicInput from "../DynamicInput";
import EducationDate from "./EducationDate";
import { useDispatch } from "react-redux";
import { editEducationString } from "../../state/resumeSlice";

function EducationSection({
  id,
  schoolName,
  degree,
  monthEnded,
  yearEnded,
}: EducationProps) {
  const dispatch = useDispatch();

  return (
    <div className="w-full mb-3">
      <div className="flex justify-between mb-1">
        <div className="w-full font-bold">
          <DynamicInput
            text={schoolName}
            handleOnSubmit={(text: string) =>
              dispatch(editEducationString({ id, field: "schoolName", text }))
            }
            inputWidth="full"
            placeholderText="University Name"
          />
        </div>
        <div>
          <EducationDate
            id={id}
            monthEnded={monthEnded}
            yearEnded={yearEnded}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <DynamicInput
          text={degree}
          handleOnSubmit={(text: string) =>
            dispatch(editEducationString({ id, field: "degree", text }))
          }
          inputWidth="full"
          placeholderText="Degree, and optional honors/gpa"
        />
      </div>
    </div>
  );
}

export default EducationSection;
