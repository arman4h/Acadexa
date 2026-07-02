import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-xl border border-[#EAECEF] bg-white px-3 py-2 text-sm font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#FAFBFD] transition-all duration-150 cursor-pointer dark:border-[#2B3442] dark:bg-[#111827] dark:text-[#CBD5E1] dark:hover:bg-[#0F172A]"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium className="w-4 h-4" /> : <MoonStar className="w-4 h-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
