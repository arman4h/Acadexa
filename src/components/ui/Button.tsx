import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]/50 cursor-pointer";

  const variants = {
    primary: "bg-[#4F7CFF] text-white hover:bg-[#3B66E0] shadow-sm",
    secondary:
      "bg-white text-[#1F2937] border border-[#EAECEF] hover:bg-[#FAFBFA] shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
    ghost: "text-[#6B7280] hover:bg-[#EAECEF]/50 dark:text-slate-400 dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
