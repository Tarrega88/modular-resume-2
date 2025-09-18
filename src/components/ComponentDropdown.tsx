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

type Props = {
  kind: Kinds;
  text: string;
  renderIndex: number;
  setIsExpanded(e: boolean): void;
  isExpanded: boolean;
};

//TODO 9/17/2025: consider adding a checkbox to allow user to choose whether to close on adding/replacing section
function ComponentDropdown({
  kind,
  text,
  renderIndex,
  isExpanded,
  setIsExpanded,
}: Props) {
  const [selectedKind, setSelectedKind] = useState(kind);

  const searchRef = useRef<HTMLInputElement>(null);

  const [isMaximized, setIsMaximized] = useState(true);

  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.resume);
  const dataType = kindToData[selectedKind];
  const options = data[dataType];

  const entries = Object.entries(options);

  const { dropdownIsReplace } = useSelector((state: RootState) => state.resume);

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
    } else {
      dispatch(
        addResumeItemAt({
          renderIndex,
          data: {
            id: crypto.randomUUID(),
            kind,
            elementId: newId,
          },
        })
      );
    }
    setIsExpanded(false);
  }

  function handleSelectOption(data: ResumeItemProps) {
    if (dropdownIsReplace) {
      dispatch(replaceResumeItem({ renderIndex, data }));
    } else {
      dispatch(addResumeItemAt({ renderIndex, data }));
    }
    setIsExpanded(false);
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

  const height = isMaximized ? "h-116" : "h-38";

  const onStyle = "bg-green-600 hover:bg-green-700";
  const offStyle = "bg-gray-500 opacity-50 hover:bg-green-700";

  const addButtonStyle = dropdownIsReplace ? offStyle : onStyle;
  const replaceButtonStyle = dropdownIsReplace ? onStyle : offStyle;

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
          {/* <div className="font-semibold">{text}</div> */}
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
          <div className="text-lg border-b text-center">
            {/* {renderArr.length > 0
              ? `Previously Made ${kindToSection[selectedKind]} Sections:`
              : `No ${kindToSection[selectedKind]} sections found`} */}
          </div>
          <div className="font-bold p-1 border-b bg-slate-200">
            Default {kindToSection[selectedKind]} section:
          </div>
          <div
            className="border-b hover:bg-sky-100 transition-all duration-200 cursor-pointer overflow-auto"
            onClick={() => handleSelectDefault(selectedKind)}
          >
            <div className="pointer-events-none px-1">
              <ResumeItemRenderer
                id={crypto.randomUUID()}
                kind={selectedKind}
                renderIndex={renderIndex}
                renderUI={false}
              />
            </div>
          </div>
          <div className="font-bold p-1 border-b bg-slate-200">
            Previously made {kindToSection[selectedKind]} sections:
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
