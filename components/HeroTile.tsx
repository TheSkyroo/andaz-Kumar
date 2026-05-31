"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, Calendar, Clock } from "lucide-react";

const STREAK = 12;

function useGreeting() {
  const [greeting, setGreeting] = useState("Good evening");
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

export default function HeroTile() {
  const greeting = useGreeting();

  return (
    <motion.article
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="grain-texture relative overflow-hidden rounded-2xl border border-white/[0.06] p-6 md:p-8"
      style={{
        background:
          "radial-gradient(ellipse at 10% 50%, rgba(139,92,246,0.18) 0%, transparent 55%), radial-gradient(ellipse at 90% 20%, rgba(59,130,246,0.12) 0%, transparent 55%), #16161f",
      }}
    >
      {/* Decorative glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400 mb-1">{greeting}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Andaz Kumar
            </span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-md">
            You&apos;re on a roll! Keep up the momentum and hit your daily learning goals.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Streak badge */}
          <div className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Daily Streak</p>
              <p className="text-lg font-bold text-slate-100 leading-none">{STREAK} days</p>
            </div>
          </div>

          {/* Streak dots */}
          <div className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Calendar size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">This Week</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i < 5 ? "bg-violet-500" : "bg-white/[0.1]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Today</p>
              <p className="text-lg font-bold text-slate-100 leading-none">2.4 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
