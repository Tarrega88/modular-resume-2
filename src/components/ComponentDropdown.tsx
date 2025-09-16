import { useRef, useState } from "react";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { RxCaretDown } from "react-icons/rx";
import { Kinds, ResumeItemProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import { addResumeItem, replaceResumeItem } from "@/state/resumeSlice";
import { FaRegWindowMinimize } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";

type Props = {
  kind: Kinds;
  renderIndex: number;
};

const kindToData = {
  prevJob: "prevJobs",
  education: "education",
  project: "projects",
  summary: "summaries",
  bulletPoint: "bulletPoints",
  userInfo: "userInfo",
  sectionHeader: "sectionHeaders",
  skill: "skills",
};

function ComponentDropdown({ kind, renderIndex }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.resume);

  const dataType = kindToData[kind];

  const options = data[dataType];
  const arr = Object.keys(options);
  // const vals = Object.values(options);
  // console.log(vals);

  // const filtered = vals.filter((e: any) => e.title)

  function handleSelectOption(data: ResumeItemProps) {
    dispatch(replaceResumeItem({ renderIndex, data }));
  }

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      autoFocus
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return;
        setIsExpanded(false);
      }}
      className="text-base w-[754px]"
    >
      {isExpanded ? (
        <div className="w-[754px] bg-slate-800 overflow-scroll p-1 absolute rounded-sm">
          <div className="flex justify-between px-2 text-slate-50 h-10 items-center">
            <div className="">Select a previously made section:</div>
            <div className="flex gap-2 items-center">
              <HiMagnifyingGlass />
              <input
                className="bg-slate-200 text-slate-950 outline-1 h-6 px-1"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="filter by keyword"
              />
            </div>
            <div
              className="hover:outline cursor-pointer size-5 flex justify-center"
              onClick={() => setIsExpanded(false)}
            >
              <FaRegWindowMinimize />
            </div>
          </div>
          <div className="flex-col bg-white h-28 overflow-y-scroll overflow-x-hidden">
            {arr.map((e, i) => (
              <div
                key={i}
                className="border-b hover:bg-sky-100 transition-all duration-200 cursor-pointer"
                onClick={() =>
                  handleSelectOption({
                    id: crypto.randomUUID(),
                    kind,
                    elementId: e,
                  })
                }
              >
                <div className="pointer-events-none">
                  <ResumeItemRenderer
                    id={crypto.randomUUID()}
                    kind={kind}
                    elementId={e}
                    renderIndex={i}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <RelativeAbsLeft hPosition="far">
        <RxCaretDown
          className="text-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </RelativeAbsLeft>
    </div>
  );
}

export default ComponentDropdown;
