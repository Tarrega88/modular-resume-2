function GeneratePDFButton({ onPrint }: { onPrint(): void }) {
  return (
    <div className="flex justify-center py-4 border-b bg-blue-400">
      <button
        className="rounded-sm px-3 py-1 bg-slate-800 text-white cursor-pointer transition-all duration-200 hover:bg-slate-900 hover:text-slate-100"
        onClick={onPrint}
      >
        View PDF
      </button>
    </div>
  );
}

export default GeneratePDFButton;
