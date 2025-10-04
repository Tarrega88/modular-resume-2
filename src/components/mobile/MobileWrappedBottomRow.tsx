import { Kinds } from "@/state/types";
import MobileButtonRow from "./MobileButtonRow";
import MobileButton from "./MobileButton";
import { IoIosInformationCircle, IoIosLink } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserBool } from "@/state/resumeSlice";
import { RootState } from "@/state/store";
import { getUserInfoProps } from "@/utils/getProps";
import { MdOutlineTitle } from "react-icons/md";
import { FiUnderline } from "react-icons/fi";

/*const iconData = [
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

type Props = {
  kind: Kinds;
  id?: string;
  elementId?: string;
};

function MobileWrappedBottomRow({ kind, id, elementId }: Props) {
  const data = useSelector((state: RootState) => state.resume.data);

  //   return (
  //     <ResumeHeader
  //       id={info.id}
  //       kind={info.kind}
  //       showIcons={info.showIcons}

  //TODO 10/4/2025: consider extracing the switch statement into separate components - it's already unwieldy with just one result

  /*
   const underlineButtonStyle = hasUnderline
    ? "text-slate-800 hover:text-slate-600"
    : "text-gray-400 hover:text-slate-500";

  const iconButtonStyle = showIcons
    ? "text-sky-500 hover:text-sky-400"
    : "text-gray-300 hover:text-sky-300";

  const titleButtonStyle = showProfession
    ? "text-neutral-800 hover:text-neutral-700"
    : "text-neutral-300 hover:text-neutral-500";
  */

  const dispatch = useDispatch();

  switch (kind) {
    case "bulletPoint":
      return <div></div>;
    case "divider":
      return <div></div>;
    case "education":
      return <div></div>;
    case "prevJob":
      return <div></div>;
    case "project":
      return <div></div>;
    case "sectionHeader":
      return <div></div>;
    case "skill":
      return <div></div>;
    case "summary":
      return <div></div>;
    case "userInfo":
      const info = elementId ? data.userInfo[elementId] : getUserInfoProps("");
      return (
        <MobileButtonRow>
          <MobileButton
            border="r"
            onClick={() =>
              dispatch(
                toggleUserBool({
                  id: elementId,
                  field: "showIcons",
                  show: !info.showIcons,
                })
              )
            }
          >
            <IoIosInformationCircle className="text-sky-500" />
          </MobileButton>
          <MobileButton
            border="r"
            onClick={() =>
              dispatch(
                toggleUserBool({
                  id: elementId,
                  field: "showProfession",
                  show: !info.showProfession,
                })
              )
            }
          >
            <MdOutlineTitle />
          </MobileButton>
          <MobileButton
            border="r"
            onClick={() =>
              dispatch(
                toggleUserBool({
                  id: elementId,
                  field: "hasUnderline",
                  show: !info.hasUnderline,
                })
              )
            }
          >
            <FiUnderline />
          </MobileButton>
          <MobileButton
            border="r"
            onClick={() =>
              dispatch(
                toggleUserBool({
                  id: elementId,
                  field: "showLink1",
                  show: !info.showLink1,
                })
              )
            }
          >
            <IoIosLink className="text-blue-600" />
          </MobileButton>
          <MobileButton
            onClick={() =>
              dispatch(
                toggleUserBool({
                  id: elementId,
                  field: "showLink2",
                  show: !info.showLink2,
                })
              )
            }
          >
            <IoIosLink className="text-blue-600" />
          </MobileButton>{" "}
        </MobileButtonRow>
      );
  }

  return (
    <div className="h-1/2">
      <div className="flex h-full"></div>
    </div>
  );
}

export default MobileWrappedBottomRow;
