/**
 * Static feed data for SPEC 01 (home feed).
 * No database or API yet: this module is the single source of posts
 * and will be replaced by real data fetching in a future spec.
 *
 * Identifiers are in English; visible copy (values) is in Spanish,
 * taken verbatim from references/pantallas/feed.dc.html.
 */

export type PostType = "achievement" | "activity" | "announcement";

export interface FeedPost {
  id: string;
  /** Display name shown in the card header (Spanish copy). */
  author: string;
  /** Avatar initials; when absent the card renders an icon avatar. */
  avatarInitials?: string;
  /** Time + attribution line, e.g. "14:20 · publicado por vos". */
  time: string;
  /** Recipient shown in the "Para:" line (Spanish copy). */
  audience: string;
  /** Post body text (Spanish copy). */
  body: string;
  /** Caption for the dashed photo placeholder; hidden when absent. */
  photoCaption?: string;
  likes: number;
  comments: number;
  type: PostType;
}

export interface PostTypeBadge {
  /** Uppercase label rendered in the badge (Spanish copy). */
  label: string;
  /** Tailwind classes for the badge background + text colors. */
  backgroundClass: string;
  /** Tailwind classes for the status dot. */
  dotClass: string;
}

/** Maps internal post types to their visible badge styling. */
export const postTypeBadge: Record<PostType, PostTypeBadge> = {
  achievement: {
    label: "LOGRO",
    backgroundClass: "bg-achievement-soft text-achievement",
    dotClass: "bg-achievement",
  },
  activity: {
    label: "ACTIVIDAD",
    backgroundClass: "bg-activity-soft text-activity",
    dotClass: "bg-activity",
  },
  announcement: {
    label: "ANUNCIO",
    backgroundClass: "bg-announcement-soft text-announcement",
    dotClass: "bg-announcement",
  },
};

export const posts: FeedPost[] = [
  {
    id: "post-1",
    author: "Mateo",
    avatarInitials: "M",
    time: "14:20 · publicado por vos",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
    type: "achievement",
  },
  {
    id: "post-2",
    author: "Mateo",
    avatarInitials: "M",
    time: "09:40 · publicado por vos",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoCaption: "Foto · pintando con témperas",
    likes: 5,
    comments: 2,
    type: "activity",
  },
  {
    id: "post-3",
    author: "Anuncio general",
    time: "07:50 · publicado por vos",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
    type: "announcement",
  },
];
