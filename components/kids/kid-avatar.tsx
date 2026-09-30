import type { AvatarTone } from "@/lib/kids-data";

const TONE_BACKGROUNDS: Record<AvatarTone, string> = {
  sky: "bg-sky",
  pink: "bg-pink",
  green: "bg-green",
  yellow: "bg-yellow",
  purple: "bg-purple",
  steel: "bg-steel",
};

const TONE_INKS: Record<AvatarTone, string> = {
  sky: "text-sky-ink",
  pink: "text-pink-ink",
  green: "text-green-ink",
  yellow: "text-yellow-ink",
  purple: "text-purple-ink",
  steel: "text-white",
};

const SIZE_CLASSES = {
  sm: "h-10 w-10 text-base",
  md: "h-12 w-12 text-[19px]",
  lg: "h-[84px] w-[84px] text-[34px]",
} as const;

export type AvatarSize = keyof typeof SIZE_CLASSES;

interface KidAvatarProps {
  initial: string;
  tone: AvatarTone;
  size?: AvatarSize;
  /** "tone" uses the tone's own ink; "white" is the solid variant (parent avatars). */
  ink?: "tone" | "white";
}

/** Round initial avatar with a tonic background (mockup kid avatars). */
export function KidAvatar({ initial, tone, size = "md", ink = "tone" }: KidAvatarProps) {
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full font-display font-semibold ${TONE_BACKGROUNDS[tone]} ${
        ink === "white" ? "text-white" : TONE_INKS[tone]
      } ${SIZE_CLASSES[size]}`}
    >
      {initial}
    </div>
  );
}