"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  heroSlot: ReactNode;
  coursesSlot: ReactNode;
  activitySlot: ReactNode;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28 },
  },
};

export default function BentoContainer({ heroSlot, coursesSlot, activitySlot }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-12 gap-4 md:gap-5"
    >
      <motion.div variants={item} className="col-span-12">
        {heroSlot}
      </motion.div>

      <motion.div variants={item} className="col-span-12 md:col-span-8">
        {coursesSlot}
      </motion.div>

      <motion.div variants={item} className="col-span-12 md:col-span-4">
        {activitySlot}
      </motion.div>
    </motion.div>
  );
}
