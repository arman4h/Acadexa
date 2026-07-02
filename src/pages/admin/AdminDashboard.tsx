import { useQuery } from "@tanstack/react-query";
import { GraduationCap, FolderOpen, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../services/courseService";
import { getContributions } from "../../services/resourceService";

export function AdminDashboard() {
  const { data: courses } = useQuery({ queryKey: ["courses", "all"], queryFn: getAllCourses });
  const { data: contributions } = useQuery({ queryKey: ["contributions"], queryFn: getContributions });

  const resourceCount = courses?.reduce((s, c) => s + (c.resource_count ?? 0), 0) ?? 0;

  const stats = [
    { label: "Courses", value: courses?.length ?? 0, icon: GraduationCap, href: "/nimda/courses", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
    { label: "Resources", value: resourceCount, icon: FolderOpen, href: "/nimda/resources", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
    { label: "Pending Contributions", value: contributions?.length ?? 0, icon: UserCheck, href: "/nimda/contributions", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.href} className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-all duration-150 hover:shadow-md">
            <div className={`rounded-xl p-2.5 w-fit mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">{stat.value}</p>
            <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="font-semibold text-[#1F2937] dark:text-slate-100 mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { label: "Manage Courses", href: "/nimda/courses" },
            { label: "Manage Resources", href: "/nimda/resources" },
            { label: "Review Contributions", href: "/nimda/contributions" },
          ].map((action) => (
            <Link key={action.href} to={action.href} className="px-4 py-2 rounded-xl bg-[#4F7CFF]/10 text-[#4F7CFF] text-sm font-medium hover:bg-[#4F7CFF]/20 transition-all duration-150">
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
