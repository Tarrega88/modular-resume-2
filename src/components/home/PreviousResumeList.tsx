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
  const pageLength = 5;
  const maxPages = Math.ceil(length / pageLength);

  const paginatedValues = filteredValues.slice(
    page * pageLength,
    page * pageLength + pageLength
  );

  return (
    <div className="bg-slate-600 rounded-md p-4 flex flex-col gap-3">
      <div className="flex justify-between pb-6">
        <div className="text-emerald-400 font-bold">Past Resumes</div>
        <div className="flex items-center relative">
          <input
            placeholder="Search Resumes"
            className="text-white placeholder:text-slate-300 bg-slate-500 rounded-sm pl-8 pr-2 w-36 sm:w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaMagnifyingGlass className="text-slate-300 absolute left-2" />
        </div>
      </div>
      <PageTurner page={page} setPage={setPage} maxPages={maxPages} />
      <div className="text-slate-100 flex justify-between sm:grid sm:grid-cols-[200px_5fr_1fr] items-center p-2 font-semibold">
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
          page={page}
          length={length}
          pageLength={pageLength}
          setPage={setPage}
          maxPages={maxPages}
        />
      ))}
    </div>
  );
}

export default PreviousResumeList;
