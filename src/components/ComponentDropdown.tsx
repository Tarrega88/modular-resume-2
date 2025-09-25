import { useEffect, useRef, useState } from "react";
import { Kinds, ResumeItemProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import {
  addResumeItemAt,
  replaceResumeItem,
  toggleDropdownIsReplace,
} from "@/state/resumeSlice";
import {
  FaRegWindowMaximize,
  FaRegWindowMinimize,
  FaRegWindowRestore,
} from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { getFilterPlaceholders } from "@/utils/getProps";
import ListOfKinds from "./ListOfKinds";
import addDataFromKind from "@/utils/addDataFromKind";
import { kindToData, kindToSection } from "@/utils/getKindDisplayInfo";
import { toast } from "sonner";

const moreSectionHeaderDefaults = [
  "Experience",
  "Education",
  "Skills",
  "Projects",
];

type Props = {
  kind: Kinds;
  renderIndex: number;
  setIsExpanded(e: boolean): void;
  isExpanded: boolean;
};

function ComponentDropdown({
  kind,
  renderIndex,
  isExpanded,
  setIsExpanded,
}: Props) {
  const [selectedKind, setSelectedKind] = useState(kind);

  const searchRef = useRef<HTMLInputElement>(null);

  const [isMaximized, setIsMaximized] = useState(true);

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { data, resumeMetaData, currentResumeId } = useSelector(
    (state: RootState) => state.resume
  );
  const { margin } = resumeMetaData[currentResumeId];
  const dataType = kindToData[selectedKind];
  const options = data[dataType];

  const entries = Object.entries(options);

  const { dropdownIsReplace } = useSelector((state: RootState) => state.resume);

  const displayKindOriginal = kindToSection[kind];
  const displayKind = kindToSection[selectedKind];

  const [addToIndex, setAddToIndex] = useState(renderIndex);

  function handleSelectDefault(kind: Kinds) {
    const newId = addDataFromKind(kind, dispatch);
    if (dropdownIsReplace) {
      dispatch(
        replaceResumeItem({
          renderIndex,
          data: {
            id: crypto.randomUUID(),
            kind,
            elementId: newId,
          },
        })
      );
      toast.success(
        `Replaced ${displayKindOriginal} section with default ${displayKind} section.`
      );
      setIsExpanded(false);
    } else {
      dispatch(
        addResumeItemAt({
          renderIndex: addToIndex,
          data: {
            id: crypto.randomUUID(),
            kind,
            elementId: newId,
          },
        })
      );
      setAddToIndex(addToIndex + 1);
      toast.success(`Added default ${displayKind} section.`);
    }
  }

  function handleSelectOption(data: ResumeItemProps) {
    if (dropdownIsReplace) {
      dispatch(replaceResumeItem({ renderIndex, data }));
      toast.success(
        `Replaced ${displayKindOriginal} section with custom ${displayKind} section.`
      );
      setIsExpanded(false);
    } else {
      dispatch(addResumeItemAt({ renderIndex: addToIndex, data }));
      setAddToIndex(addToIndex + 1);
      toast.success(`Added custom ${displayKind} section.`);
    }
  }

  const placeholderEntries = Object.entries(
    getFilterPlaceholders(selectedKind)!
  ) as [string, any][];
  const q = searchText.trim().toLowerCase();

  const norm = (v: unknown) => String(v ?? "").toLowerCase();
  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => norm(v) === norm(b[i]));

  function differsForKey(k: string, defVal: any, item: any) {
    if (k === "list") {
      const a = (item.list ?? []) as string[];
      const b = (defVal ?? []) as string[];
      return !arraysEqual(a, b);
    } else if (selectedKind === "sectionHeader") {
      return (
        norm(item[k]) !== norm(defVal) &&
        !moreSectionHeaderDefaults.includes(item[k])
      );
    } else {
      return norm(item[k]) !== norm(defVal);
    }
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

  const height = isMaximized ? "h-116" : "h-38";

  const onStyle = "bg-green-600 hover:bg-green-700";
  const offStyle = "bg-gray-500 opacity-50 hover:bg-green-700";

  const addButtonStyle = dropdownIsReplace ? offStyle : onStyle;
  const replaceButtonStyle = dropdownIsReplace ? onStyle : offStyle;

  const widthStyle = { 48: 754, 72: 706, 96: 658 };

  return (
    <div
      tabIndex={-1}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return;
        setIsExpanded(false);
      }}
      className="text-base"
      style={{ width: widthStyle[margin] }}
    >
      <div
        className=" bg-slate-800 overflow-scroll p-1 rounded-sm absolute z-50"
        style={{ width: widthStyle[margin] }}
      >
        <div className="flex justify-between px-2 text-slate-50 h-10 items-center">
          <div className="flex gap-6">
            <div className="font-bold">Mode:</div>
            <button
              onClick={() => dispatch(toggleDropdownIsReplace(false))}
              className={`${addButtonStyle} cursor-pointer transition-all duration-200 w-20 font-semibold rounded-sm`}
            >
              Add
            </button>
            <button
              onClick={() => dispatch(toggleDropdownIsReplace(true))}
              className={`${replaceButtonStyle} cursor-pointer transition-all duration-200 w-20 font-semibold rounded-sm`}
            >
              Replace
            </button>
          </div>
          <div className="flex gap-12">
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
            <div className="flex items-end gap-4">
              <div
                className="hover:outline cursor-pointer size-6 flex justify-center items-center"
                onClick={() => setIsMaximized(!isMaximized)}
              >
                {isMaximized ? <FaRegWindowRestore /> : <FaRegWindowMaximize />}
              </div>
              <div
                className="hover:outline cursor-pointer size-6 flex justify-center"
                onClick={() => setIsExpanded(false)}
              >
                <FaRegWindowMinimize />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex-col bg-white ${height} overflow-y-scroll overflow-x-hidden transition-all duration-200`}
        >
          <ListOfKinds
            kind={selectedKind}
            setKind={(e: Kinds) => setSelectedKind(e)}
          />
          <div className="font-bold p-1 border-b bg-slate-200">
            Default {displayKind} section:
          </div>
          <div
            className="border-b hover:bg-sky-100 transition-all duration-200 cursor-pointer overflow-auto"
            onClick={() => handleSelectDefault(selectedKind)}
          >
            <div className="pointer-events-none px-1">
              <ResumeItemRenderer
                id={crypto.randomUUID()}
                kind={selectedKind}
                renderUI={false}
              />
            </div>
          </div>
          <div className="font-bold p-1 border-b bg-slate-200">
            Previously made {displayKind} sections:
          </div>
          {renderArr.map((e, i) => (
            <div
              key={i}
              className="border-b hover:bg-sky-100 transition-all duration-200 cursor-pointer overflow-auto"
              onClick={() =>
                handleSelectOption({
                  id: crypto.randomUUID(),
                  kind: selectedKind,
                  elementId: e,
                })
              }
            >
              <div className="pointer-events-none px-1">
                <ResumeItemRenderer
                  id={crypto.randomUUID()}
                  kind={selectedKind}
                  elementId={e}
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
