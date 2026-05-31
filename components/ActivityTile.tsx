"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

// Mulberry32 — a deterministic seeded PRNG so server and client produce identical output.
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s |= 0; s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateActivityData() {
  const weeks = 15;
  const days = 7;
  const rand = seededRng(0xdeadbeef);
  const data: { week: number; day: number; count: number }[] = [];

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const isRecent = w >= weeks - 3;
      const r = rand();
      const count = isRecent
        ? r < 0.2 ? 0 : Math.floor(r * 5) + 1
        : r < 0.4 ? 0 : Math.floor(r * 4);
      data.push({ week: w, day: d, count });
    }
  }
  return data;
}

const activityData = generateActivityData();

function getColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.05)";
  if (count === 1) return "rgba(139,92,246,0.25)";
  if (count === 2) return "rgba(139,92,246,0.45)";
  if (count === 3) return "rgba(139,92,246,0.65)";
  return "rgba(139,92,246,0.9)";
}

const dayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export default function ActivityTile() {
  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.article
      whileHover={{
        scale: 1.01,
        boxShadow: "0 0 24px rgba(139,92,246,0.15)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="grain-texture h-full rounded-2xl border border-white/[0.06] p-5 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 55%), #16161f",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
          <Activity size={14} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-100">Activity</h2>
          <p className="text-xs text-slate-500">{totalContributions} contributions</p>
        </div>
      </div>

      {/* Contribution graph */}
      <div className="flex gap-1" aria-label="Activity contribution graph">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="h-[10px] flex items-center"
              style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)", width: 20 }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-1 flex-1">
          {Array.from({ length: 15 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1 flex-1">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const cell = activityData.find(
                  (d) => d.week === weekIdx && d.day === dayIdx
                );
                const count = cell?.count ?? 0;
                return (
                  <motion.div
                    key={dayIdx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (weekIdx * 7 + dayIdx) * 0.004,
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                    className="rounded-[3px]"
                    style={{
                      backgroundColor: getColor(count),
                      aspectRatio: "1",
                      minWidth: 8,
                    }}
                    title={`${count} activities`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-slate-500">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-2.5 h-2.5 rounded-[3px]"
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span className="text-[10px] text-slate-500">More</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white/[0.04] rounded-xl p-3">
          <p className="text-xs text-slate-500">Avg / day</p>
          <p className="text-lg font-bold text-slate-100 mt-0.5">
            {(totalContributions / (15 * 7)).toFixed(1)}
          </p>
        </div>
        <div className="bg-white/[0.04] rounded-xl p-3">
          <p className="text-xs text-slate-500">Best streak</p>
          <p className="text-lg font-bold text-slate-100 mt-0.5">12 days</p>
        </div>
      </div>
    </motion.article>
  );
}
