import Link from "next/link";
import { notFound } from "next/navigation";

import { MobileNav } from "@/components/feed/mobile-nav";
import { Sidebar } from "@/components/feed/sidebar";
import { AllergyAlert } from "@/components/kids/allergy-alert";
import { DailySummaryButton } from "@/components/kids/daily-summary-button";
import { KidDetails } from "@/components/kids/kid-details";
import { LinkedParents } from "@/components/kids/linked-parents";
import { ProfileHeader } from "@/components/kids/profile-header";
import { kidProfiles, kids } from "@/lib/kids-data";

function BackToKidsLink() {
  return (
    <Link
      href="/kids"
      className="mb-5 flex items-center gap-[7px] text-sm font-bold text-subtle"
    >
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
        <path d="m15 18-6-6 6-6" />
      </svg>
      Volver a Niños
    </Link>
  );
}

export default async function KidProfilePage({ params }: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const kid = kids.find((item) => item.id === id);
  const profile = kidProfiles.find((item) => item.kidId === id);

  // Only the kid present in the mock data has a profile; everything else is a 404.
  if (!kid || !profile) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activeNav="kids" />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav activeNav="kids" />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
            <BackToKidsLink />
            <div className="flex flex-col gap-[26px] lg:flex-row lg:items-start">
              <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
                <ProfileHeader kid={kid} profile={profile} />
                <AllergyAlert profile={profile} />
                <KidDetails profile={profile} />
              </div>
              <div className="flex w-full flex-col gap-3.5 lg:w-[300px] lg:flex-none">
                <DailySummaryButton />
                <LinkedParents profile={profile} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
