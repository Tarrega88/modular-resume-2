import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import JobStart from "./JobStart";
import JobEnd from "./JobEnd";
import DynamicInput from "../DynamicInput";
import { PrevJobProps } from "../../state/types";
import { updatePrevJobField } from "../../state/resumeSlice";

function JobSection({
  id,
  companyName,
  jobTitle,
  location,
  monthStarted,
  yearStarted,
  monthEnded,
  yearEnded,
  renderUI,
}: PrevJobProps & { renderUI: boolean }) {
  const state = useSelector((state: RootState) => state.resume);
  const { monthType } = state;

  const dispatch = useDispatch();

  return (
    <div className="mt-3 mb-1" inert={!renderUI}>
      <div className="flex justify-between">
        <div className="font-semibold pb-1 w-full">
          <DynamicInput
            text={companyName}
            handleOnSubmit={(text: string) =>
              dispatch(
                updatePrevJobField({ id, field: "companyName", value: text })
              )
            }
            inputWidth="full"
            placeholderText="Enter company name"
          />
        </div>
        <div className="flex w-max gap-1">
          <JobStart id={id} monthType={monthType} month={monthStarted} />
          <DynamicInput
            text={yearStarted.toString()}
            handleOnSubmit={(text: string) =>
              dispatch(
                updatePrevJobField({ id, field: "yearStarted", value: text })
              )
            }
            inputWidth="char"
            placeholderText="Year"
          />
          <div> - </div>
          <JobEnd id={id} monthType={monthType} month={monthEnded} />
          {monthEnded != 12 ? (
            <DynamicInput
              text={yearEnded.toString()}
              handleOnSubmit={(text: string) =>
                dispatch(
                  updatePrevJobField({ id, field: "yearEnded", value: text })
                )
              }
              inputWidth="char"
              placeholderText="Year"
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-between">
        <DynamicInput
          text={jobTitle}
          handleOnSubmit={(text: string) =>
            dispatch(updatePrevJobField({ id, field: "jobTitle", value: text }))
          }
          textAlign="left"
          inputWidth="full"
          placeholderText="Enter job title"
        />
        <DynamicInput
          text={location}
          handleOnSubmit={(text: string) =>
            dispatch(updatePrevJobField({ id, field: "location", value: text }))
          }
          textAlign="right"
          inputWidth="full"
          placeholderText="Enter location"
        />
      </div>
    </div>
  );
}

export default JobSection;
