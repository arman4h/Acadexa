import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, GraduationCap, FolderOpen, UserCheck, LogOut, Eye, EyeOff, MoonStar } from "lucide-react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useState } from "react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";

const navItems = [
  { to: "/nimda", label: "Dashboard", icon: LayoutDashboard },
  { to: "/nimda/courses", label: "Courses", icon: GraduationCap },
  { to: "/nimda/resources", label: "Resources", icon: FolderOpen },
  { to: "/nimda/contributions", label: "Contributions", icon: UserCheck },
];

const superAdminItems = [
  { to: "/nimda/admins", label: "Admins", icon: UserCheck },
  { to: "/nimda/activity-log", label: "Activity Log", icon: MoonStar },
];

function LoginGate() {
  const { login, loading } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      setError(false);
      setMessage("");
    } else {
      setError(true);
      setMessage(result.message ?? "Login failed.");
    }
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-24 text-center">
      <div className="rounded-2xl bg-white border border-[#EAECEF] p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mx-auto mb-4">
          <img src="/logo.svg" alt="Acadex" className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-[#1F2937] mb-1 dark:text-slate-100">Admin Access</h1>
        <p className="text-sm text-[#6B7280] mb-6 dark:text-slate-400">Enter your username and password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(false); setMessage(""); }}
            autoFocus
            className={`w-full rounded-xl border ${error ? "border-red-400" : "border-[#EAECEF]"} bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500`}
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); setMessage(""); }}
              className={`w-full rounded-xl border ${error ? "border-red-400" : "border-[#EAECEF]"} bg-white px-4 py-3 pr-11 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] cursor-pointer dark:text-slate-400 dark:hover:text-slate-200"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 text-left">{message || "Incorrect username or password."}</p>}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated, isSuperAdmin, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <LoginGate />;
  }

  const allowedForAdmin = ["/nimda", "/nimda/resources", "/nimda/contributions"].some((path) =>
    location.pathname === path
  );
  const allowedForSuperAdmin = location.pathname.startsWith("/nimda/") || location.pathname === "/nimda";

  if (!isSuperAdmin && !allowedForAdmin) {
    return <Navigate to="/nimda" replace />;
  }

  if (isSuperAdmin && !allowedForSuperAdmin) {
    return <Navigate to="/nimda" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 dark:text-slate-100">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150 dark:text-slate-400">
          <img src="/logo.svg" alt="Acadex" className="w-5 h-5" />
          Back to site
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-red-500 transition-colors duration-150 cursor-pointer dark:text-slate-400"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

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
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
          {isSuperAdmin && superAdminItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                    : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#EAECEF]/50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
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

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAECEF] flex justify-around py-2 z-50 dark:bg-slate-950 dark:border-slate-800">
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
