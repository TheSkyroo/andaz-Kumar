"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111118]/95 backdrop-blur-md border-t border-white/[0.06]">
      <ul className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-bg"
                    className="absolute inset-0 rounded-lg bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-violet-400" : "text-slate-500"
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] transition-colors ${
                    isActive ? "text-slate-200" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
