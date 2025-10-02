type Props = {
  text: string;
  onClick(): void;
  disabled?: boolean;
  countdownSec?: number;
};

function TopMenuButton({
  text,
  onClick,
  disabled = false,
  countdownSec,
}: Props) {
  const label = countdownSec != null ? `${text} (${countdownSec}s)` : text;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      disabled={disabled}
      className={[
        "transition-all duration-150 flex items-center justify-between px-4 py-1 w-full",
        disabled
          ? "bg-neutral-500 cursor-not-allowed opacity-70"
          : "bg-neutral-700 hover:bg-neutral-600",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default TopMenuButton;
