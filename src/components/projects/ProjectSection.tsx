import { ProjectProps } from "@/state/types";
import UserLink from "../UserLink";
import DynamicInput from "../DynamicInput";
import DynamicTextArea from "../DynamicTextArea";
import { useDispatch } from "react-redux";
import { editProjectBool, editProjectString } from "@/state/resumeSlice";
import RelativeAbsRight from "../wrappers/RelativeAbsRight";
import SideLinkButton from "../SideLinkButton";

function ProjectSection({
  id,
  kind,
  title,
  description,
  hasWebsite,
  website,
  renderUI,
}: ProjectProps & { renderUI: boolean }) {
  function handleOnSubmit() {
    //temp
  }

  const dispatch = useDispatch();

  function handleShowLink(bool: boolean) {
    dispatch(editProjectBool({ id, bool, field: "hasWebsite" }));
  }

  return (
    <div className="mb-2">
      {renderUI ? (
        <RelativeAbsRight vPosition="med" hPosition="close">
          <SideLinkButton
            id={website}
            handleOnClick={() => handleShowLink(!hasWebsite)}
            active={hasWebsite}
          />
        </RelativeAbsRight>
      ) : null}
      <div className="flex mb-1 justify-between">
        <div className="font-bold w-full">
          <DynamicInput
            text={title}
            handleOnSubmit={(text) =>
              dispatch(editProjectString({ id, field: "title", text }))
            }
            inputWidth="full"
            divWidth="full"
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
    </div>
  );
}

export default ProjectSection;
