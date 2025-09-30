import { RxCaretDown } from "react-icons/rx";
import { IoAddCircle, IoDuplicate } from "react-icons/io5";
import { IoIosInformationCircle, IoIosLink } from "react-icons/io";
import { MdLabel, MdOutlineTitle } from "react-icons/md";
import { FiUnderline } from "react-icons/fi";
import { useState } from "react";

const iconData = [
  {
    iconName: "Dropdown",
    description:
      "Opens a window that allows you to view your previously made sections",
    icon: <RxCaretDown className="text-black" />,
  },
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

function LowerIconGuide() {
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const activeIcon = iconData[activeIconIndex];

  return (
    <div className="flex w-full bg-neutral-200 text-neutral-950">
      <div className="size-40 flex flex-col justify-between p-3 text-2xl">
        <div className="flex justify-between">
          {iconData.slice(0, 3).map((e, i) => (
            <button
              className="cursor-pointer"
              onClick={() => setActiveIconIndex(i)}
              key={i}
            >
              {e.icon}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          {iconData.slice(3, 6).map((e, i) => (
            <button
              className="cursor-pointer"
              onClick={() => setActiveIconIndex(i + 3)}
              key={i}
            >
              {e.icon}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          {iconData.slice(6).map((e, i) => (
            <button
              className="cursor-pointer"
              onClick={() => setActiveIconIndex(i + 6)}
              key={i}
            >
              {e.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full px-4 border-l py-2">
        <div className="flex gap-4 items-center pb-1">
          <div className="text-lg">{activeIcon.iconName}</div>
          <div className="text-2xl">{activeIcon.icon}</div>
        </div>
        <div>{activeIcon.description}</div>
      </div>
    </div>
  );
}

export default LowerIconGuide;
