"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/types";

interface Props {
  course: Course;
  colorIndex: number;
}

const meshClasses = ["mesh-purple", "mesh-blue", "mesh-cyan", "mesh-green"];
const accentColors = [
  "from-violet-500 to-blue-500",
  "from-blue-500 to-cyan-500",
  "from-cyan-500 to-teal-500",
  "from-emerald-500 to-blue-500",
];
const barColors = [
  "bg-gradient-to-r from-violet-500 to-blue-500",
  "bg-gradient-to-r from-blue-500 to-cyan-500",
  "bg-gradient-to-r from-cyan-500 to-teal-500",
  "bg-gradient-to-r from-emerald-500 to-blue-500",
];
const glowColors = [
  "rgba(139,92,246,0.35)",
  "rgba(59,130,246,0.35)",
  "rgba(6,182,212,0.35)",
  "rgba(16,185,129,0.35)",
];

function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  const Icon = icons[name] ?? icons["BookOpen"];
  return <Icon size={size} />;
}

function AnimatedProgressBar({
  progress,
  colorClass,
}: {
  progress: number;
  colorClass: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(progress), 200);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
      />
    </div>
  );
}

export default function CourseCard({ course, colorIndex }: Props) {
  const idx = colorIndex % meshClasses.length;
  const glow = glowColors[idx];

  return (
    <motion.article
      className={`grain-texture relative overflow-hidden rounded-2xl border border-white/[0.06] p-5 cursor-pointer ${meshClasses[idx]}`}
      whileHover={{
        scale: 1.015,
        borderColor: glow.replace("0.35", "0.5"),
        boxShadow: `0 0 24px ${glow}, 0 0 48px ${glow.replace("0.35", "0.08")}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentColors[idx]} flex items-center justify-center text-white mb-4`}
      >
        <DynamicIcon name={course.icon_name} size={18} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-100 mb-1 leading-snug">
        {course.title}
      </h3>
      <p className="text-xs text-slate-500 mb-4">In progress</p>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-slate-200">{course.progress}%</span>
        </div>
        <AnimatedProgressBar progress={course.progress} colorClass={barColors[idx]} />
      </div>
    </motion.article>
  );
}
