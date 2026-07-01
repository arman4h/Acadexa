import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#1F2937]">{children}</h2>
      {subtitle && (
        <p className="mt-1 text-[#6B7280]">{subtitle}</p>
      )}
    </div>
  );
}
