import { MobileNav } from "@/components/feed/mobile-nav";
import { PostCard } from "@/components/feed/post-card";
import { Sidebar } from "@/components/feed/sidebar";
import { posts } from "@/lib/feed-data";

function CameraIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function FeedHeader() {
  return (
    <div className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
        GUARDERÍA · SALA SOLES
      </div>
      <h1 className="m-0 font-display text-[30px] font-semibold text-ink">
        Buenas, Caro
      </h1>
      <p className="mt-[5px] text-[14.5px] text-subtle">
        12 niños · martes 17 jun
      </p>
    </div>
  );
}

function PostComposer() {
  return (
    <a
      href="#"
      className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-edge bg-card px-[18px] py-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-flame font-display text-base font-semibold text-white">
        C
      </div>
      <span className="flex-1 text-[15px] text-muted">
        Compartí un momento…
      </span>
      <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-accent-soft text-accent-bright">
        <CameraIcon />
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
            <FeedHeader />
            <PostComposer />
            <div className="mb-3.5 flex items-center gap-3.5">
              <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-label">
                PUBLICADO HOY
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
