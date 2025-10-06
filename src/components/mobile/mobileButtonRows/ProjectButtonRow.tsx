import { useDispatch, useSelector } from "react-redux";
import MobileButtonRow from "../MobileButtonRow";
import { RootState } from "@/state/store";
import MobileButton from "../MobileButton";
import { editProjectBool } from "@/state/resumeSlice";
import { IoIosLink } from "react-icons/io";

function ProjectButtonRow({ elementId }) {
  const data = useSelector((state: RootState) => state.resume.data);
  const dispatch = useDispatch();

  const hasWebsite = data.projects[elementId].hasWebsite;

  const linkStyle = hasWebsite
    ? "text-blue-600 hover:text-blue-700"
    : "text-gray-400 hover:text-blue-400";

  return (
    <MobileButtonRow>
      <MobileButton
        text="Toggle Link"
        onClick={() =>
          dispatch(
            editProjectBool({
              id: elementId,
              field: "hasWebsite",
              bool: !hasWebsite,
            })
          )
        }
      >
        <IoIosLink className={linkStyle} />
      </MobileButton>
    </MobileButtonRow>
  );
}

export default ProjectButtonRow;
