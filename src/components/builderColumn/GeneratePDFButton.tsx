function GeneratePDFButton({ onPrint }: { onPrint(): void }) {
  return (
    <div className="flex justify-center py-4 border-b bg-blue-500">
      <button
        className="h-10 w-28 font-semibold rounded-sm px-3 py-1 bg-slate-100 text-slate-900 cursor-pointer hover:outline-2 outline-sky-800 transition-all duration-100 shadow-lg"
        onClick={onPrint}
      >
        View PDF
      </button>
    </div>
  );
}

export default GeneratePDFButton;
