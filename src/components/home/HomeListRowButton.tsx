function HomeListRowButton({ text, onClick }) {
  return (
    <div className="bg-sky-600 px-2 py-1 rounded-sm" onClick={onClick}>
      {text}
    </div>
  );
}

export default HomeListRowButton;
