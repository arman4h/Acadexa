import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, GraduationCap, FolderOpen, ArrowLeft, UserCheck } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/courses", label: "Courses", icon: GraduationCap },
  { to: "/admin/resources", label: "Resources", icon: FolderOpen },
  { to: "/admin/contributions", label: "Contributions", icon: UserCheck },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to site
      </Link>

      <div className="flex gap-8">
        <nav className="hidden md:flex flex-col gap-1 w-48 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 min-w-0 pb-16 md:pb-0">
          <Outlet />
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAECEF] flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-medium transition-all duration-150 ${
                active ? "text-[#4F7CFF]" : "text-[#6B7280]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
