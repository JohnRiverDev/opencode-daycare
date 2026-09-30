function SearchIcon() {
  return (
    <svg
      className="flex-none text-photo-ink"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/** Visual-only search field: it takes focus but does not filter the list. */
export function KidSearchField() {
  return (
    <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-edge bg-card px-4 py-3">
      <SearchIcon />
      <input
        type="text"
        aria-label="Buscar niño"
        placeholder="Buscar niño…"
        className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink placeholder:text-placeholder focus:outline-none"
      />
    </div>
  );
}
