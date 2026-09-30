import type { KidProfile, ParentStatus } from "@/lib/kids-data";
import { KidAvatar } from "./kid-avatar";

const STATUS_CLASSES: Record<ParentStatus, string> = {
  active: "bg-parent-active text-parent-active-ink",
  pending: "bg-parent-pending text-parent-pending-ink",
};

const STATUS_LABELS: Record<ParentStatus, string> = {
  active: "ACTIVA",
  pending: "PENDIENTE",
};

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** "PADRES VINCULADOS" card with one row per parent plus the "Vincular otro padre" action. */
export function LinkedParents({ profile }: { profile: KidProfile }) {
  return (
    <div className="rounded-[16px] border border-edge bg-card px-[18px] py-4">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-label">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {profile.parents.map((parent) => (
          <div key={parent.name} className="flex items-center gap-3">
            <KidAvatar
              initial={parent.avatarInitial}
              tone={parent.avatarTone}
              size="sm"
              ink="white"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-extrabold text-ink">{parent.name}</div>
              <div className="text-[12.5px] text-muted">
                {parent.relationship} · {parent.statusLabel}
              </div>
            </div>
            <span
              className={`flex-none rounded-full px-[9px] py-[4px] text-[10.5px] font-extrabold ${STATUS_CLASSES[parent.status]}`}
            >
              {STATUS_LABELS[parent.status]}
            </span>
          </div>
        ))}
        <a href="#" className="flex items-center gap-3 pt-2">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[color:var(--color-dashed)] text-photo-ink">
            <PlusIcon />
          </span>
          <span className="text-[14.5px] font-extrabold text-accent-deep">
            Vincular otro padre
          </span>
        </a>
      </div>
    </div>
  );
}
