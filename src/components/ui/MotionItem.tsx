import type { ReactNode } from "react";

/**
 * Дочірній елемент StaggerGroup.
 * Серверний компонент — затримку появи задає CSS через :nth-child.
 */
export function MotionItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag data-reveal="up" className={className}>
      {children}
    </Tag>
  );
}
