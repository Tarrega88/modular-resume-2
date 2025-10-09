import { useDispatch, useSelector } from "react-redux";
import HomeListRowButton from "./HomeListRowButton";
import {
  addBulletData,
  addDividerData,
  addEducationData,
  addPrevJobData,
  addProjectData,
  addResumeItem,
  addSectionHeaderData,
  addSkillData,
  addSummaryData,
  addUserInfoData,
  copyResume,
  createEmptyResume,
  deleteResume,
  generateMetaData,
  setCurrentResume,
} from "@/state/resumeSlice";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoDuplicate } from "react-icons/io5";
import { makeId } from "@/utils/makeId";
import { RootState } from "@/state/store";

function HomeListRow({
  text,
  createdAt,
  id,
  odd,
  page,
  length,
  pageLength,
  setPage,
  maxPages,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentResumeId, resumes, data } = useSelector(
    (state: RootState) => state.resume
  );
  const selectedResume = resumes[currentResumeId];

  function handleCopyResume() {
    dispatch(copyResume({ originalId: id, newId: makeId() }));
  }

  function handleDelete() {
    dispatch(deleteResume(id));
    if ((length - 1) / pageLength === maxPages - 1 && page + 1 === maxPages) {
      setPage(page - 1);
    }
  }

  function handleContinue() {
    dispatch(setCurrentResume(id));
    navigate(`/builder/${id}`);
  }

  const colorStyle = odd
    ? "outline-slate-800"
    : "bg-slate-700 outline-slate-700";

  function handleUncoupledCopy() {
    const newResumeId = makeId();

    dispatch(setCurrentResume(newResumeId));
    dispatch(generateMetaData(newResumeId));
    dispatch(createEmptyResume());
    for (const e of selectedResume) {
      const newId = makeId();
      const kind = e.kind;
      const elementId = e.elementId;
      const oldId = e.id;

      switch (kind) {
        case "bulletPoint":
          const bpData = data.bulletPoints[elementId];
          dispatch(addBulletData({ id: newId, kind, text: bpData.text }));

          break;
        case "divider":
          const dividerData = data.dividers[elementId];
          dispatch(
            addDividerData({ id: newId, kind, height: dividerData.height })
          );
          break;
        case "education":
          const educationData = data.education[elementId];
          dispatch(
            addEducationData({
              id: newId,
              kind,
              schoolName: educationData.schoolName,
              degree: educationData.degree,
              monthEnded: educationData.monthEnded,
              yearEnded: educationData.yearEnded,
            })
          );
          break;
        case "prevJob":
          const prevJobData = data.prevJobs[elementId];
          dispatch(
            addPrevJobData({
              id: newId,
              kind,
              companyName: prevJobData.companyName,
              jobTitle: prevJobData.jobTitle,
              location: prevJobData.location,
              monthStarted: prevJobData.monthStarted,
              monthEnded: prevJobData.monthEnded,
              yearStarted: prevJobData.yearStarted,
              yearEnded: prevJobData.yearEnded,
            })
          );
          break;
        case "project":
          const projectData = data.projects[elementId];
          dispatch(
            addProjectData({
              id: newId,
              kind,
              title: projectData.title,
              description: projectData.description,
              hasWebsite: projectData.hasWebsite,
              website: projectData.website,
            })
          );
          break;
        case "sectionHeader":
          const sectionHeaderData = data.sectionHeaders[elementId];
          dispatch(
            addSectionHeaderData({
              id: newId,
              kind,
              text: sectionHeaderData.text,
              underline: sectionHeaderData.underline,
            })
          );
          break;
        case "skill":
          const skillData = data.skills[elementId];
          dispatch(
            addSkillData({
              id: newId,
              kind,
              list: skillData.list,
              showCategory: skillData.showCategory,
              category: skillData.category,
            })
          );
          break;
        case "summary":
          const summaryData = data.summaries[elementId];
          dispatch(addSummaryData({ id: newId, kind, text: summaryData.text }));
          break;
        case "userInfo":
          const userInfoData = data.userInfo[elementId];
          dispatch(
            addUserInfoData({
              id: newId,
              kind,
              fullName: userInfoData.fullName,
              showIcons: userInfoData.showIcons,
              professionTitle: userInfoData.professionTitle,
              showProfession: userInfoData.showProfession,
              hasUnderline: userInfoData.hasUnderline,
              email: userInfoData.email,
              phoneNumber: userInfoData.phoneNumber,
              location: userInfoData.location,
              userLink1: userInfoData.userLink1,
              userLink2: userInfoData.userLink2,
              showLink1: userInfoData.showLink1,
              showLink2: userInfoData.showLink2,
            })
          );
          break;
      }
      dispatch(addResumeItem({ kind, elementId: newId }));
    }
  }

  return (
    <div
      className={`text-slate-100 flex justify-between sm:grid sm:grid-cols-[200px_5fr_1fr] items-center p-2 ${colorStyle} rounded-sm outline-3`}
    >
      <div>{createdAt}</div>
      <div>{text}</div>
      <div className="flex gap-4 justify-end flex-wrap sm:flex-nowrap">
        <HomeListRowButton
          text="Continue"
          color="emerald"
          onClick={handleContinue}
        />
        {/* <HomeListRowButton
          text="Copy"
          onClick={handleUncoupledCopy}
          color="sky"
        >
          <div>Test</div>
        </HomeListRowButton> */}
        <HomeListRowButton text="Copy" onClick={handleCopyResume} color="sky">
          <IoDuplicate />
        </HomeListRowButton>
        <HomeListRowButton text="Delete" onClick={handleDelete} color="red">
          <FaTrash />
        </HomeListRowButton>
      </div>
    </div>
  );
}

export default HomeListRow;
