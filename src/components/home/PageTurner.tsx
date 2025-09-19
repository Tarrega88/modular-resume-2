import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

function PageTurner({ length, page, setPage }) {
  const flatLength = Math.floor(length / 10);

  return (
    <div className="flex justify-end text-slate-100 items-center">
      <button onClick={() => setPage(page === 0 ? 0 : page - 1)}>
        <FaCaretLeft className="text-lg cursor-pointer" />
      </button>
      <div>
        {page + 1} / {flatLength + 1}
      </div>
      <button
        onClick={() => setPage(page !== flatLength ? page + 1 : flatLength)}
      >
        <FaCaretRight className="text-lg cursor-pointer" />
      </button>
    </div>
  );
}

export default PageTurner;
