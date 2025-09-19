function GeneratePDFButton({ onPrint }: { onPrint(): void }) {
  return (
    <div className="flex justify-center py-4 bg-blue-50">
      <button
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onPrint()}
        className="h-10 w-28 font-semibold rounded-sm px-3 py-1 bg-slate-100 text-slate-900 cursor-pointer border outline-sky-800 hover:outline-1 border-sky-800 transition-all duration-50 shadow-lg"
        onClick={onPrint}
      >
        View PDF
      </button>
    </div>
  );
}

export default GeneratePDFButton;
