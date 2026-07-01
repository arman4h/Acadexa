import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { getTrimesters } from "../../services/trimesterService";
import { EmptyState } from "../../components/ui/EmptyState";

export function AdminTrimesters() {
  const { data: trimesters, isLoading } = useQuery({ queryKey: ["trimesters"], queryFn: getTrimesters });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1F2937] mb-6">Trimesters</h1>
      <p className="text-sm text-[#6B7280] mb-6">Trimesters 1–12 are predefined and cannot be modified.</p>

      {!isLoading && trimesters?.length === 0 && <EmptyState title="No trimesters" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {trimesters?.map((t) => (
          <div key={t.id} className="rounded-2xl border border-[#EAECEF] bg-white p-4 flex items-center gap-3">
            <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5">
              <BookOpen className="w-4 h-4 text-[#4F7CFF]" />
            </div>
            <div>
              <p className="font-medium text-[#1F2937]">{t.name}</p>
              <p className="text-sm text-[#6B7280]">{t.course_count ?? 0} courses</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
