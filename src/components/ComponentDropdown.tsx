import { useRef, useState } from "react";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { RxCaretDown } from "react-icons/rx";
import { Kinds, ResumeItemProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import { replaceResumeItem } from "@/state/resumeSlice";
import { FaRegWindowMinimize } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getFilterPlaceholders } from "@/utils/getProps";

type Props = {
  kind: Kinds;
  renderIndex: number;
  isExpanded: boolean;
  setIsExpanded(e: boolean): void;
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

function ComponentDropdown({
  kind,
  renderIndex,
  isExpanded,
  setIsExpanded,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.resume);
  const dataType = kindToData[kind];
  const options = data[dataType];
  const arr = Object.keys(options);

  const entries = Object.entries(options);

  function handleSelectOption(data: ResumeItemProps) {
    dispatch(replaceResumeItem({ renderIndex, data }));
  }

  const placeholders = Object.entries(getFilterPlaceholders(kind));

  const renderArr: string[] = [];
  for (const [id, item] of entries as [string, any][]) {
    for (const [k, defVal] of placeholders) {
      const differs =
        k === "list"
          ? (item.list ?? []).length !== (defVal ?? []).length ||
            (item.list ?? []).some(
              (v: string, i: number) => v !== (defVal ?? [])[i]
            )
          : item[k] !== defVal;
      if (differs) {
        renderArr.push(id);
        break;
      }
    }
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
        <div className="w-[754px] bg-slate-800 overflow-scroll p-1 rounded-sm absolute z-50">
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
            {renderArr.map((e, i) => (
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
                    renderUI={false}
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
