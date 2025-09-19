import { FaMagnifyingGlass } from "react-icons/fa6";
import HomeListRow from "./HomeListRow";
import { ResumeMetaDataProps } from "@/state/types";
import { useState } from "react";
import PageTurner from "./PageTurner";

function PreviousResumeList({ values }) {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  const filteredValues =
    searchText.length > 0
      ? values.filter((e: ResumeMetaDataProps) => {
          const lowerSearch = searchText.toLowerCase();
          return (
            e.createdAt.toLowerCase().includes(lowerSearch) ||
            e.resumeName.toLowerCase().includes(lowerSearch)
          );
        })
      : values;

  const length = filteredValues.length;

  const paginatedValues = filteredValues.slice(page * 10, page * 10 + 10);

  return (
    <div className="bg-slate-600 rounded-md p-4 flex flex-col gap-3">
      <div className="flex justify-between pb-6">
        <div className="text-emerald-400 font-bold">Past Resumes</div>
        <div className="flex items-center relative">
          <input
            placeholder="Search Resumes"
            className="text-white placeholder:text-slate-300 bg-slate-500 rounded-sm pl-8 pr-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaMagnifyingGlass className="text-slate-300 absolute left-2" />
        </div>
      </div>
      <PageTurner length={length} page={page} setPage={setPage} />
      <div className="text-slate-100 grid grid-cols-[200px_5fr_1fr] items-center p-2 font-semibold">
        <div>Created At</div>
        <div>Resume Title</div>
        <div className="text-right">Options</div>
      </div>
      {paginatedValues.map((e: ResumeMetaDataProps, i: number) => (
        <HomeListRow
          key={i}
          text={e.resumeName}
          createdAt={e.createdAt}
          id={e.resumeId}
          odd={i % 2 === 1}
        />
      ))}
    </div>
  );
}

export default PreviousResumeList;
