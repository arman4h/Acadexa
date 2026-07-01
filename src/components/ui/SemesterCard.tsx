import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Semester } from "../../types";

interface SemesterCardProps {
  semester: Semester;
}

export function SemesterCard({ semester }: SemesterCardProps) {
  return (
    <Link
      to={`/semester/${semester.id}`}
      className="group block rounded-2xl border border-[#EAECEF] bg-white p-6 transition-all duration-150 hover:shadow-md hover:border-[#4F7CFF]/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 w-fit mb-4">
            <BookOpen className="w-5 h-5 text-[#4F7CFF]" />
          </div>
          <h3 className="text-lg font-semibold text-[#1F2937]">
            {semester.name}
          </h3>
          <p className="text-sm text-[#6B7280] mt-1">
            {semester.course_count ?? 0} courses
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-[#6B7280] transition-all duration-150 group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
