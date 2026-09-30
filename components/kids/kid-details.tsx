import type { KidProfile } from "@/lib/kids-data";

interface DetailRow {
  label: string;
  value: string;
}

/** Visible copy for the detail rows, mapped from the profile fields. */
function detailRows(profile: KidProfile): DetailRow[] {
  return [
    { label: "Fecha de nacimiento", value: profile.birthDate },
    { label: "Sala", value: profile.room },
    { label: "Ingreso", value: profile.admissionDate },
  ];
}

/** Card with the three detail rows (birth date, room, admission). */
export function KidDetails({ profile }: { profile: KidProfile }) {
  const rows = detailRows(profile);

  return (
    <div className="overflow-hidden rounded-[16px] border border-edge bg-card">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`flex items-center justify-between px-[18px] py-[15px] ${
            index < rows.length - 1 ? "border-b border-edge-soft" : ""
          }`}
        >
          <span className="text-[14.5px] text-subtle">{row.label}</span>
          <span className="text-[14.5px] font-extrabold text-ink">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
