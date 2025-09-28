import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PageTurner({ page, setPage, maxPages }) {
  return (
    <div className="flex justify-end text-slate-100 items-center gap-1">
      <button onClick={() => setPage(page === 0 ? 0 : page - 1)}>
        <IoIosArrowBack className="cursor-pointer" />
      </button>
      <div>
        {page + 1} / {Math.ceil(maxPages)}
      </div>
      <button
        onClick={() => setPage(page < maxPages - 1 ? page + 1 : maxPages - 1)}
      >
        <IoIosArrowForward className="cursor-pointer" />
      </button>
    </div>
  );
}

export default PageTurner;
