import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-150";

  const variants = {
    default: "bg-[#EAECEF] text-[#6B7280]",
    primary: "bg-[#4F7CFF]/10 text-[#4F7CFF]",
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
