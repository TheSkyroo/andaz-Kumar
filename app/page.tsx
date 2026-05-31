import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import HeroTile from "@/components/HeroTile";
import CoursesGrid from "@/components/CoursesGrid";
import ActivityTile from "@/components/ActivityTile";
import CourseSkeleton from "@/components/CourseSkeleton";
import MobileNav from "@/components/MobileNav";
import BentoContainer from "@/components/BentoContainer";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="p-4 md:p-6 lg:p-8">
          <BentoContainer
            heroSlot={<HeroTile />}
            coursesSlot={
              <Suspense fallback={<CourseSkeleton />}>
                <CoursesGrid />
              </Suspense>
            }
            activitySlot={<ActivityTile />}
          />
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
