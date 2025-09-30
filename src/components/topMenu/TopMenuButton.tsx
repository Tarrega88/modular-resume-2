function TopMenuButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-700 hover:bg-neutral-600 transition-all duration-150 flex items-center justify-between px-4 py-1 w-full"
    >
      {text}
    </button>
  );
}

export default TopMenuButton;
