import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

function PageTurner({ page, setPage, maxPages }) {
  return (
    <div className="flex justify-end text-slate-100 items-center">
      <button onClick={() => setPage(page === 0 ? 0 : page - 1)}>
        <FaCaretLeft className="text-lg cursor-pointer" />
      </button>
      <div>
        {page + 1} / {Math.ceil(maxPages)}
      </div>
      <button
        onClick={() => setPage(page < maxPages - 1 ? page + 1 : maxPages - 1)}
      >
        <FaCaretRight className="text-lg cursor-pointer" />
      </button>
    </div>
  );
}

export default PageTurner;
