import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 ${icon ? "pl-12" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}
