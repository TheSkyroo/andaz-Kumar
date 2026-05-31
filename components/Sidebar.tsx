"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  Trophy,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "#" },
  { id: "progress", label: "Progress", icon: BarChart3, href: "#" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  // Auto-collapse on tablet (768–1023px), expand on desktop (≥1024px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = (e: MediaQueryList | MediaQueryListEvent) => setCollapsed(e.matches);
    sync(mq);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-full bg-[#111118] border-r border-white/[0.06] overflow-hidden shrink-0 relative"
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-semibold text-sm text-slate-100 whitespace-nowrap"
            >
              LearnHub
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer group"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`shrink-0 relative z-10 transition-colors ${
                    isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.12 }}
                      className={`relative z-10 whitespace-nowrap transition-colors ${
                        isActive ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.nav>
  );
}
