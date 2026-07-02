import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, GraduationCap, FolderOpen, ArrowLeft, UserCheck, Lock, LogOut, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useState } from "react";

const navItems = [
  { to: "/nimda", label: "Dashboard", icon: LayoutDashboard },
  { to: "/nimda/courses", label: "Courses", icon: GraduationCap },
  { to: "/nimda/resources", label: "Resources", icon: FolderOpen },
  { to: "/nimda/contributions", label: "Contributions", icon: UserCheck },
];

function LoginGate() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-24 text-center">
      <div className="rounded-2xl bg-white border border-[#EAECEF] p-8 shadow-sm">
        <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mx-auto mb-4">
          <Lock className="w-6 h-6 text-[#4F7CFF]" />
        </div>
        <h1 className="text-xl font-bold text-[#1F2937] mb-1">Admin Access</h1>
        <p className="text-sm text-[#6B7280] mb-6">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              autoFocus
              className={`w-full rounded-xl border ${error ? "border-red-400" : "border-[#EAECEF]"} bg-white px-4 py-3 pr-11 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] cursor-pointer"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 text-left">Incorrect password.</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#4F7CFF] text-white py-3 text-sm font-semibold hover:bg-[#3B66E0] transition-all duration-150 shadow-sm cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <LoginGate />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>
        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-red-500 transition-colors duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
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
