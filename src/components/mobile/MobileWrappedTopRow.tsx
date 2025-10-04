/*const iconData = [

  {
    iconName: "Duplicate Section",
    description:
      "Adds a default section of the same type underneath the current section",
    icon: <IoDuplicate tabIndex={-1} className="text-sky-600 outline-0" />,
  },
  {
    iconName: "Remove Section",
    description: "Removes a section from the resume",
    icon: (
      <IoAddCircle className="rotate-45 text-red-600 outline-0" tabIndex={-1} />
    ),
  },
  {
    iconName: "Icons",
    description: "Toggle whether a contact information section will have icons",
    icon: <IoIosInformationCircle className="text-sky-500" />,
  },
  {
    iconName: "Profession",
    description: "Toggle the professional title under your name",
    icon: <MdOutlineTitle className="text-neutral-800" />,
  },
  {
    iconName: "Underline",
    description:
      "Toggle the underline on section headers and contact info sections",
    icon: <FiUnderline className="text-black" />,
  },
  {
    iconName: "Link",
    description:
      "Toggle whether a section has a link, typically for showcasing a portfolio website or project",

    icon: <IoIosLink className="text-blue-600" />,
  },
  {
    iconName: "Label",
    description:
      "Toggles whether a list has a category, typically used to categorize skills into things like Programming Languages, Software, and soft skills",

    icon: <MdLabel className="text-sky-500 outline-0" tabIndex={-1} />,
  },
];
*/

import { RxCaretDown } from "react-icons/rx";
import MobileButton from "./MobileButton";
import { IoAddCircle, IoDuplicate } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { duplicateSection, removeResumeItem } from "@/state/resumeSlice";
import addDataFromKind from "@/utils/addDataFromKind";

function MobileWrappedTopRow({ activeIndex, setActiveIndex, kind, elementId }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeResumeItem({ renderIndex: activeIndex }));
  }

  function handleDuplicate() {
    const id = addDataFromKind(kind, dispatch);

    dispatch(
      duplicateSection({
        kind,
        elementId: id,
        index: activeIndex,
      })
    );
    setActiveIndex(activeIndex + 1);
  }

  return (
    <div className="h-1/2">
      <div className="flex h-full border-b">
        <MobileButton border="r" onClick={handleDuplicate}>
          <IoDuplicate className="text-sky-600" />
        </MobileButton>
        <MobileButton
          border="r"
          onClick={() => console.log("Under Construction")}
        >
          <div className="text-xs">Mobile Layout Under Construction</div>
          {/* <RxCaretDown className="text-black" /> */}
        </MobileButton>
        <MobileButton onClick={handleDelete}>
          <IoAddCircle className="rotate-45 text-red-600 outline-0" />
        </MobileButton>
      </div>
    </div>
  );
}

export default MobileWrappedTopRow;
