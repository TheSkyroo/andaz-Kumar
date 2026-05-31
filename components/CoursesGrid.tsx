import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";
import CourseCardAnimated from "./CourseCardAnimated";

async function getCourses(): Promise<{ data: Course[] | null; error: string | null }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) return { data: null, error: error.message };
    return { data: data as Course[], error: null };
  } catch {
    return { data: null, error: "Failed to connect to the database." };
  }
}

const FALLBACK_COURSES: Course[] = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Code2", created_at: "" },
  { id: "2", title: "TypeScript Mastery", progress: 45, icon_name: "FileCode", created_at: "" },
  { id: "3", title: "System Design", progress: 30, icon_name: "Network", created_at: "" },
  { id: "4", title: "Next.js & Full Stack", progress: 60, icon_name: "Layers", created_at: "" },
];

export default async function CoursesGrid() {
  const { data, error } = await getCourses();
  const courses = data && data.length > 0 ? data : FALLBACK_COURSES;

  return (
    <section aria-label="Active courses">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-100">Active Courses</h2>
        {error && (
          <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-md">
            Using demo data
          </span>
        )}
      </div>

      <CourseCardAnimated courses={courses} />
    </section>
  );
}
