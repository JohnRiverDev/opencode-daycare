function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** "GESTIÓN" / "Niños" heading with the "Agregar niño" action (static link). */
export function KidsHeader() {
  return (
    <div className="mb-[22px] flex items-end justify-between gap-4">
      <div>
        <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
          GESTIÓN
        </div>
        <h1 className="m-0 font-display text-[30px] font-semibold text-ink">Niños</h1>
      </div>
      <a
        href="#"
        className="flex items-center gap-2 rounded-[14px] bg-linear-to-b from-flame to-flame-deep px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
      >
        <PlusIcon />
        Agregar niño
      </a>
    </div>
  );
}
