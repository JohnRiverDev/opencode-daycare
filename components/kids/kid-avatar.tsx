import type { AvatarTone } from "@/lib/kids-data";

const TONE_CLASSES: Record<AvatarTone, string> = {
  sky: "bg-sky text-sky-ink",
  pink: "bg-pink text-pink-ink",
  green: "bg-green text-green-ink",
  yellow: "bg-yellow text-yellow-ink",
  purple: "bg-purple text-purple-ink",
  steel: "bg-steel text-white",
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
}

/** Round initial avatar with a tonic background (mockup kid avatars). */
export function KidAvatar({ initial, tone, size = "md" }: KidAvatarProps) {
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full font-display font-semibold ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]}`}
    >
      {initial}
    </div>
  );
}