import { MobileNav } from "@/components/feed/mobile-nav";
import { Sidebar } from "@/components/feed/sidebar";
import { KidCard } from "@/components/kids/kid-card";
import { KidSearchField } from "@/components/kids/kid-search-field";
import { KidsHeader } from "@/components/kids/kids-header";
import { kids } from "@/lib/kids-data";

// Only this kid has a profile in the mock data, so only its card is navigable.
const PROFILE_KID_ID = "1";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar activeNav="kids" />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav activeNav="kids" />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
            <KidsHeader />
            <KidSearchField />
            <div className="mb-3.5 flex items-center gap-3">
              <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
                SALA SOLES
              </span>
              <span className="text-[13px] text-muted">{kids.length} niños</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {kids.map((kid) => (
                <KidCard
                  key={kid.id}
                  kid={kid}
                  href={kid.id === PROFILE_KID_ID ? `/kids/${kid.id}` : undefined}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
