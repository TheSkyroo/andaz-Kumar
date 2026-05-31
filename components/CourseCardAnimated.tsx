"use client";

import { motion, type Variants } from "framer-motion";
import type { Course } from "@/types";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

export default function CourseCardAnimated({ courses }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {courses.map((course, index) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CourseCard course={course} colorIndex={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
