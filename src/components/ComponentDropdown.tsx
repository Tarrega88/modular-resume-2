import { useState } from "react";
import RelativeAbsLeft from "./wrappers/RelativeAbsLeft";
import { RxCaretDown } from "react-icons/rx";
import { Kinds, ResumeItemProps } from "@/state/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import ResumeItemRenderer from "./ResumeItemRenderer";
import { addResumeItem, replaceResumeItem } from "@/state/resumeSlice";
import { FaRegWindowMinimize } from "react-icons/fa";

type Props = {
  kind: Kinds;
  renderIndex: number;
};

const kindToData = {
  prevJob: "prevJobs",
  education: "education",
  project: "projects",
  summary: "summaries",
};

function ComponentDropdown({ kind, renderIndex }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.resume);

  const dataType = kindToData[kind];

  const options = data[dataType];
  const arr = Object.keys(options);

  function handleSelectOption(data: ResumeItemProps) {
    dispatch(replaceResumeItem({ renderIndex, data }));
  }

  return (
    <div>
      {isExpanded ? (
        <div
          className="w-[754px] bg-slate-800 overflow-scroll p-1 absolute rounded-sm"
          // onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="flex justify-between pr-2 text-slate-50">
            <div className="">Select a previously made section:</div>
            <FaRegWindowMinimize
              className="hover:outline cursor-pointer"
              onClick={() => setIsExpanded(false)}
            />
          </div>
          <div className="flex-col bg-white h-28 overflow-scroll">
            {arr.map((e, i) => (
              <div
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
                  {/* </div> */}
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
