"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerChild } from "@/lib/motion";

/**
 * Дочірній елемент StaggerGroup — з'являється у спільній послідовності.
 * Винесений окремим клієнтським компонентом, щоб серверні секції
 * могли просто обгортати свої картки без "use client".
 */
export function MotionItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag variants={staggerChild} className={className}>
      {children}
    </Tag>
  );
}
