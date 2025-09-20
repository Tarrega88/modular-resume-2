import { UserInfoProps } from "../state/types";
import UserLink from "./UserLink";

import {
  toggleUserBool,
  editUserInfo,
  locationDefault,
} from "../state/resumeSlice";
import DynamicInput from "./DynamicInput";
import { useDispatch } from "react-redux";
import RelativeAbsRight from "./wrappers/RelativeAbsRight";
import SideLinkButton from "./absoluteUI/SideLinkButton";
import IconWrapper from "./wrappers/IconWrapper";
import { FaPhone } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FiUnderline } from "react-icons/fi";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { MdOutlineTitle } from "react-icons/md";

function ResumeHeader({
  id,
  fullName = "Full Name",
  showIcons,
  professionTitle,
  showProfession,
  hasUnderline,
  email = "email@email.com",
  phoneNumber = "(123) 123-4567",
  location = locationDefault,
  userLink1,
  userLink2,
  showLink1,
  showLink2,
  renderUI,
}: UserInfoProps & {
  renderUI: boolean;
}) {
  const dispatch = useDispatch();

  function handleShowLink({
    field,
    show,
  }: {
    field: "showLink1" | "showLink2";
    show: boolean;
  }) {
    dispatch(toggleUserBool({ id, field, show }));
  }

  const underlineStyle = hasUnderline ? "border-b" : "";

  const underlineButtonStyle = hasUnderline
    ? "text-slate-800 hover:text-slate-600"
    : "text-gray-400 hover:text-slate-500";

  const iconButtonStyle = showIcons
    ? "text-sky-500 hover:text-sky-400"
    : "text-gray-300 hover:text-sky-300";

  const titleButtonStyle = showProfession
    ? "text-neutral-800 hover:text-neutral-700"
    : "text-neutral-300 hover:text-neutral-500";

  return (
    <div className="mb-8 group" inert={!renderUI}>
      {renderUI ? (
        <>
          <RelativeAbsRight vPosition="med" hPosition="normal">
            <SideLinkButton
              handleOnClick={() =>
                handleShowLink({ field: "showLink1", show: !showLink1 })
              }
              active={showLink1}
            />
            <SideLinkButton
              handleOnClick={() =>
                handleShowLink({ field: "showLink2", show: !showLink2 })
              }
              active={showLink2}
            />
          </RelativeAbsRight>
          <RelativeAbsLeft hPosition="normal" vPosition="med">
            <MdOutlineTitle
              className={`text-xl ${titleButtonStyle} transition-all duration-200`}
              onClick={() =>
                dispatch(
                  toggleUserBool({
                    id,
                    field: "showProfession",
                    show: !showProfession,
                  })
                )
              }
            />
          </RelativeAbsLeft>
          <RelativeAbsLeft hPosition="far" vPosition="med">
            <IoIosInformationCircle
              onClick={() =>
                dispatch(
                  toggleUserBool({ id, field: "showIcons", show: !showIcons })
                )
              }
              className={`text-xl ${iconButtonStyle} transition-all duration-200`}
            />
          </RelativeAbsLeft>
          <RelativeAbsRight hPosition="close" vPosition="low">
            <FiUnderline
              tabIndex={-1}
              className={`text-xl translate-y-0.5 ${underlineButtonStyle} transition-all duration-200`}
              onClick={() =>
                dispatch(
                  toggleUserBool({
                    id,
                    field: "hasUnderline",
                    show: !hasUnderline,
                  })
                )
              }
            />
          </RelativeAbsRight>
        </>
      ) : null}
      <div className="flex justify-between">
        <div className="text-3xl font-semibold w-full">
          <DynamicInput
            text={fullName}
            handleOnSubmit={(text: string) =>
              dispatch(editUserInfo({ id, text, field: "fullName" }))
            }
            inputWidth="full"
            placeholderText="Enter name"
          />
        </div>
        <div className="flex gap-4 text-nowrap">
          {showLink1 ? (
            <UserLink
              id={userLink1}
              inputWidth="char"
              divWidth="full"
              textAlign="right"
            />
          ) : null}
          {showLink2 ? (
            <UserLink
              id={userLink2}
              inputWidth="char"
              divWidth="full"
              textAlign="right"
            />
          ) : null}
        </div>
      </div>
      <div
        className={`font-semibold ${underlineStyle} border-b-neutral-400 pb-1`}
      >
        {showProfession ? (
          <DynamicInput
            text={professionTitle}
            handleOnSubmit={(text: string) =>
              dispatch(editUserInfo({ id, text, field: "professionTitle" }))
            }
            inputWidth="full"
            placeholderText="Profession"
          />
        ) : null}
      </div>
      <div className="flex mt-2 gap-6">
        <div className="flex">
          {showIcons ? (
            <IconWrapper>
              <CiMail className="text-xl" />
            </IconWrapper>
          ) : null}
          <DynamicInput
            text={email}
            handleOnSubmit={(text: string) =>
              dispatch(editUserInfo({ id, text, field: "email" }))
            }
            inputWidth="char"
            divWidth="full"
            placeholderText="Enter email"
          />
        </div>
        <div className="flex">
          {showIcons ? (
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
          ) : null}
          <DynamicInput
            text={phoneNumber}
            handleOnSubmit={(text: string) =>
              dispatch(editUserInfo({ id, text, field: "phoneNumber" }))
            }
            inputWidth="char"
            divWidth="full"
            placeholderText="Enter phone number"
          />
        </div>
        <div className="flex">
          {showIcons ? (
            <IconWrapper>
              <CiLocationOn className="text-xl" />
            </IconWrapper>
          ) : null}
          <DynamicInput
            text={location}
            handleOnSubmit={(text: string) =>
              dispatch(editUserInfo({ id, text, field: "location" }))
            }
            inputWidth="char"
            divWidth="full"
            placeholderText="Enter location"
          />
        </div>
      </div>
    </div>
  );
}

export default ResumeHeader;
