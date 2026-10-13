"use client";

import { useState } from "react";
import { MobileNav } from "@/components/feed/mobile-nav";
import { PostCard } from "@/components/feed/post-card";
import { Sidebar } from "@/components/feed/sidebar";
import { CreatePostModal } from "@/components/feed/create-post-modal";
import { posts as initialPosts, type FeedPost, type PostType } from "@/lib/feed-data";
import { postableKids } from "@/lib/kids-data";

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
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [localPosts, setLocalPosts] = useState<FeedPost[]>(initialPosts);

  const handlePublish = (postData: {
    targetChildIds: string[];
    isForAll: boolean;
    type: PostType;
    body: string;
    photoDataUrls: string[];
  }) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} · publicado por vos`;
    
    let audience: string;
    if (postData.isForAll) {
      audience = "Para: toda la sala";
    } else if (postData.targetChildIds.length === 1) {
      const kid = postableKids.find(k => k.id === postData.targetChildIds[0]);
      audience = `Para: familia de ${kid?.name || 'niño'}`;
    } else {
      const kidNames = postData.targetChildIds.map(id => {
        const kid = postableKids.find(k => k.id === id);
        return kid?.name || 'niño';
      });
      audience = `Para: familias de ${kidNames.join(', ')}`;
    }
    
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: "Tú",
      avatarInitials: "T",
      time: timeStr,
      audience,
      body: postData.body,
      likes: 0,
      comments: 0,
      type: postData.type,
      targetChildIds: postData.targetChildIds,
      isForAll: postData.isForAll,
      photoDataUrls: postData.photoDataUrls.length > 0 ? postData.photoDataUrls : undefined,
    };
    
    setLocalPosts(prev => [newPost, ...prev]);
    setIsCreatePostModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar onNewPost={() => setIsCreatePostModalOpen(true)} />
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
              {localPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <CreatePostModal
        open={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}
