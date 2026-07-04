import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";

const links = [
  { to: "/trimesters", label: "Trimesters" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/contribute", label: "Contribute" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#EAECEF] bg-[#FAFBFD]/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-[#1F2937] dark:text-slate-100"
          >
            <img src="/logo.svg" alt="Acadex" className="h-8 w-8" />
            Acadex
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.to
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/search"
              className="ml-2 p-2 rounded-xl text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 transition-all duration-150 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-5 h-5" />
            </Link>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-xl text-[#6B7280] hover:bg-[#EAECEF]/50 transition-all duration-150 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#EAECEF] bg-white px-6 py-4 animate-[fadeIn_150ms_ease] dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.to
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
