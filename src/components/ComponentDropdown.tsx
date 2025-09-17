import { useEffect, useRef, useState } from "react";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { RxCaretDown } from "react-icons/rx";
import { Kinds, ResumeItemProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import { addResumeItemAt, replaceResumeItem } from "@/state/resumeSlice";
import { FaRegWindowMinimize } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getFilterPlaceholders } from "@/utils/getProps";
import ListOfKinds from "./ListOfKinds";

type Props = {
  kind: Kinds;
  renderIndex: number;
  setIsExpanded(e: boolean): void;
  isExpanded: boolean;
  replace: boolean;
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
  divider: "dividers",
};

function ComponentDropdown({
  kind,
  renderIndex,
  isExpanded,
  setIsExpanded,
  replace,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.resume);
  const dataType = kindToData[kind];
  const options = data[dataType];

  const entries = Object.entries(options);

  function handleSelectOption(data: ResumeItemProps) {
    if (replace) {
      dispatch(replaceResumeItem({ renderIndex, data }));
    } else {
      dispatch(addResumeItemAt({ renderIndex, data }));
    }
  }

  const placeholderEntries = Object.entries(getFilterPlaceholders(kind)!) as [
    string,
    any
  ][];
  const q = searchText.trim().toLowerCase();

  const norm = (v: unknown) => String(v ?? "").toLowerCase();
  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => norm(v) === norm(b[i]));

  function differsForKey(k: string, defVal: any, item: any) {
    if (k === "list") {
      const a = (item.list ?? []) as string[];
      const b = (defVal ?? []) as string[];
      return !arraysEqual(a, b);
    }
    return norm(item[k]) !== norm(defVal);
  }

  function matchesForKey(k: string, item: any, q: string) {
    if (!q) return true;
    if (k === "list")
      return (item.list ?? []).some((v: string) => norm(v).includes(q));
    return norm(item[k]).includes(q);
  }

  const renderArr: string[] = [];
  for (const [id, item] of entries as [string, any][]) {
    const differsAny = placeholderEntries.some(([k, defVal]) =>
      differsForKey(k, defVal, item)
    );
    if (!differsAny) continue;

    const matchesAny = q
      ? placeholderEntries.some(([k]) => matchesForKey(k, item, q))
      : true;
    if (matchesAny) renderArr.push(id);
  }

  useEffect(() => {
    if (isExpanded) searchRef.current?.focus({ preventScroll: true });
  }, [isExpanded]);

  return (
    <div
      tabIndex={-1}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return;
        setIsExpanded(false);
      }}
      className="text-base w-[754px]"
    >
      <div className="w-[754px] bg-slate-800 overflow-scroll p-1 rounded-sm absolute z-50">
        <div className="flex justify-between px-2 text-slate-50 h-10 items-center">
          <div className="">Select a previously made section</div>
          <div className="flex gap-2 items-center">
            <HiMagnifyingGlass />
            <input
              ref={searchRef}
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
        <div className="flex-col bg-white h-36 overflow-y-scroll overflow-x-hidden">
          <ListOfKinds
            renderIndex={renderIndex}
            setIsExpanded={setIsExpanded}
            replace={replace}
          />
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
                  renderIndex={i + 1}
                  renderUI={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComponentDropdown;
