import { useQuery } from "@tanstack/react-query";
import { Clock3, ShieldCheck } from "lucide-react";
import { getActivityLogs } from "../../services/adminService";
import { EmptyState } from "../../components/ui/EmptyState";

export function AdminActivityLog() {
  const { data: logs, isLoading } = useQuery({ queryKey: ["activity-log"], queryFn: () => getActivityLogs(200) });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100 mb-2">Activity Log</h1>
      <p className="text-sm text-[#6B7280] dark:text-slate-400 mb-6">Visible to Super Admin only.</p>

      {!isLoading && (!logs || logs.length === 0) && <EmptyState title="No activity yet" description="Admin actions will appear here." />}

      <div className="space-y-3">
        {logs?.map((log) => (
          <div key={log.id} className="rounded-2xl border border-[#EAECEF] bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 shrink-0">
                <Clock3 className="w-4 h-4 text-[#4F7CFF]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-[#1F2937] dark:text-slate-100">{log.action}</p>
                  <span className="text-xs rounded-full bg-[#EAECEF] px-2 py-0.5 text-[#6B7280] dark:bg-slate-800 dark:text-slate-300">{log.actor_username}</span>
                  <span className="text-xs rounded-full bg-[#EAECEF] px-2 py-0.5 text-[#6B7280] dark:bg-slate-800 dark:text-slate-300">{log.actor_role}</span>
                </div>
                <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-1">
                  {log.entity_type ? `${log.entity_type} ${log.entity_id ?? ""}` : "System action"}
                </p>
                {log.details && (
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-[#FAFBFD] p-3 text-xs text-[#6B7280] dark:bg-slate-950 dark:text-slate-300">{JSON.stringify(log.details, null, 2)}</pre>
                )}
              </div>
              <ShieldCheck className="w-4 h-4 text-[#6B7280] shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
