import { ProjectProps } from "@/state/types";
import UserLink from "../UserLink";
import DynamicInput from "../DynamicInput";
import DynamicTextArea from "../DynamicTextArea";
import { useDispatch } from "react-redux";
import { editProjectString } from "@/state/resumeSlice";

function ProjectSection({
  id,
  kind,
  title,
  description,
  hasWebsite,
  website,
}: ProjectProps) {
  function handleOnSubmit() {
    //temp
  }

  const dispatch = useDispatch();

  return (
    <div className="mb-2">
      <div className="flex mb-1 justify-between">
        <div className="font-bold">
          <DynamicInput
            text={title}
            handleOnSubmit={(text) =>
              dispatch(editProjectString({ id, field: "title", text }))
            }
            inputWidth="full"
          />
        </div>
        {hasWebsite ? (
          <UserLink
            id={website}
            inputWidth="char"
            divWidth="char"
            textAlign="right"
          />
        ) : null}
      </div>
      {/* {hasWebsite ? (
        <div className="mb-2">
          <UserLink
            id={website}
            inputWidth="char"
            divWidth="char"
            textAlign="right"
          />
        </div>
      ) : null} */}
      <div className="">
        <DynamicTextArea
          text={description}
          handleOnSubmit={(text) =>
            dispatch(editProjectString({ id, field: "description", text }))
          }
          inputWidth="full"
          placeholderText="Enter project description..."
        />
      </div>
      {/* <UserLink id={website} inputWidth="char" divWidth="char" /> */}
    </div>
  );
}

export default ProjectSection;
