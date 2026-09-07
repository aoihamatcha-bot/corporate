export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="arrow-icon"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15M13 5l7 7-7 7"} />
    </svg>
  );
}
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`spark ${className}`}
    >
      <path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4" />
    </svg>
  );
}
