import { useDispatch, useSelector } from "react-redux";
import MobileButton from "../MobileButton";
import MobileButtonRow from "../MobileButtonRow";
import { toggleUserBool } from "@/state/resumeSlice";
import { IoIosInformationCircle, IoIosLink } from "react-icons/io";
import { MdOutlineTitle } from "react-icons/md";
import { FiUnderline } from "react-icons/fi";
import { getUserInfoProps } from "@/utils/getProps";
import { RootState } from "@/state/store";

function UserInfoButtonRow({ elementId }) {
  const data = useSelector((state: RootState) => state.resume.data);
  const dispatch = useDispatch();

  const info = elementId ? data.userInfo[elementId] : getUserInfoProps("");

  const underlineButtonStyle = info.hasUnderline
    ? "text-slate-800 hover:text-slate-600"
    : "text-gray-400 hover:text-slate-500";

  const iconButtonStyle = info.showIcons
    ? "text-sky-500 hover:text-sky-400"
    : "text-gray-300 hover:text-sky-300";

  const titleButtonStyle = info.showProfession
    ? "text-neutral-800 hover:text-neutral-700"
    : "text-neutral-300 hover:text-neutral-500";

  const link1Style = info.showLink1
    ? "text-blue-600 hover:text-blue-700"
    : "text-gray-400 hover:text-blue-400";

  const link2Style = info.showLink2
    ? "text-blue-600 hover:text-blue-700"
    : "text-gray-400 hover:text-blue-400";

  return (
    <MobileButtonRow>
      <MobileButton
        text="Icons"
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
        <IoIosInformationCircle
          className={`${iconButtonStyle} transition-all duration-150`}
        />
      </MobileButton>
      <MobileButton
        text="Title"
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
        <MdOutlineTitle
          className={`${titleButtonStyle} transition-all duration-150`}
        />
      </MobileButton>
      <MobileButton
        text="Underline"
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
        <FiUnderline
          className={`${underlineButtonStyle} transition-all duration-150`}
        />
      </MobileButton>
      <MobileButton
        text="Link 1"
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
        <IoIosLink className={`${link1Style} transition-all duration-150`} />
      </MobileButton>
      <MobileButton
        text="Link 2"
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
        <IoIosLink className={`${link2Style} transition-all duration-150`} />
      </MobileButton>
    </MobileButtonRow>
  );
}

export default UserInfoButtonRow;
