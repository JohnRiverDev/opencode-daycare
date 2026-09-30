import type { Kid, KidProfile } from "@/lib/kids-data";
import { KidAvatar } from "./kid-avatar";

interface ProfileHeaderProps {
  kid: Kid;
  profile: KidProfile;
}

/** Kid identity block: avatar, name, "{edad} años · Sala {sala}" and the "Editar" action. */
export function ProfileHeader({ kid, profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-[18px]">
      <KidAvatar initial={kid.avatarInitial} tone={kid.avatarTone} size="lg" />
      <div className="min-w-0 grow basis-40 shrink">
        <h1 className="m-0 font-display text-[28px] font-semibold text-ink">{kid.name}</h1>
        <p className="mt-[3px] mb-0 text-[15px] text-subtle">
          {kid.age} años · Sala {profile.room}
        </p>
      </div>
      <a
        href="#"
        className="flex-none rounded-[12px] border-[1.5px] border-edge bg-card px-4 py-[9px] text-sm font-bold text-idle"
      >
        Editar
      </a>
    </div>
  );
}
