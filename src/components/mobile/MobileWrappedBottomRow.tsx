import { Kinds } from "@/state/types";
import UserInfoButtonRow from "./mobileButtonRows/UserInfoButtonRow";
import ProjectButtonRow from "./mobileButtonRows/ProjectButtonRow";
import HeaderButtonRow from "./mobileButtonRows/HeaderButtonRow";
import SkillButtonRow from "./mobileButtonRows/SkillButtonRow";

type Props = {
  kind: Kinds;
  id?: string;
  elementId?: string;
};

function MobileWrappedBottomRow({ kind, id, elementId }: Props) {
  //   const data = useSelector((state: RootState) => state.resume.data);

  //   return (
  //     <ResumeHeader
  //       id={info.id}
  //       kind={info.kind}
  //       showIcons={info.showIcons}

  //TODO 10/4/2025: consider extracing the switch statement into separate components - it's already unwieldy with just one result

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
      return <ProjectButtonRow elementId={elementId} />;
    case "sectionHeader":
      return <HeaderButtonRow elementId={elementId} />;
    case "skill":
      return <SkillButtonRow elementId={elementId} />;
    case "summary":
      return <div></div>;
    case "userInfo":
      return <UserInfoButtonRow elementId={elementId} />;
    default:
      return <div>Mobile Layout Under Construction</div>;
  }
}

export default MobileWrappedBottomRow;
