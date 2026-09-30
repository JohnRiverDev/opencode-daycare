import type { Kid } from "@/lib/kids-data";
import { KidAvatar } from "./kid-avatar";

const BADGE_TONE_CLASSES = {
  allergy: "bg-allergy text-allergy-ink",
  link: "bg-link text-link-ink",
} as const;

/** "{n} padres vinculados" subtitle, matching the mockup wording for 0, 1 and 2. */
function linkedParentsLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

function KidBadge({ label, tone }: { label: string; tone: keyof typeof BADGE_TONE_CLASSES }) {
  return (
    <span
      className={`flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold ${BADGE_TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="flex-none text-chevron"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const CARD_CLASSES =
  "flex min-w-0 items-center gap-[14px] rounded-[18px] border border-edge bg-card p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-card-hover";

interface KidCardProps {
  kid: Kid;
  href?: string; // when present the card is a link, otherwise a plain div
}

/** Kid list card. With `href` renders a link, without it a static div. */
export function KidCard({ kid, href }: KidCardProps) {
  const content = (
    <>
      <KidAvatar initial={kid.avatarInitial} tone={kid.avatarTone} />
      <div className="min-w-0 flex-1">
        <div className="font-display text-base font-semibold text-ink">{kid.name}</div>
        <div className="text-[13px] text-muted">
          {kid.age} años · {linkedParentsLabel(kid.linkedParentCount)}
        </div>
      </div>
      {kid.badge ? <KidBadge label={kid.badge.label} tone={kid.badge.tone} /> : <ChevronIcon />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={CARD_CLASSES}>
        {content}
      </a>
    );
  }

  return <div className={CARD_CLASSES}>{content}</div>;
}