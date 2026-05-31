"use client";

import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl border border-white/[0.06] p-5 bg-[#16161f]"
    >
      <div className="w-10 h-10 rounded-xl bg-white/[0.06] mb-4" />
      <div className="h-4 w-3/4 rounded bg-white/[0.06] mb-2" />
      <div className="h-3 w-1/3 rounded bg-white/[0.04] mb-6" />
      <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
    </motion.div>
  );
}

export default function CourseSkeleton() {
  return (
    <section>
      <div className="h-6 w-32 rounded bg-white/[0.06] mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}
