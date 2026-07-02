import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Trimester } from "../../types";

interface TrimesterCardProps {
  trimester: Trimester;
}

export function TrimesterCard({ trimester }: TrimesterCardProps) {
  return (
    <Link
      to={`/trimester/${trimester.id}`}
      className="group block rounded-2xl border border-[#EAECEF] bg-white p-4 transition-all duration-150 hover:shadow-md hover:border-[#4F7CFF]/20"
    >
      <div className="rounded-lg bg-[#4F7CFF]/10 p-2 w-fit mb-3">
        <BookOpen className="w-4 h-4 text-[#4F7CFF]" />
      </div>
      <h3 className="text-sm font-semibold text-[#1F2937]">
        {trimester.name}
      </h3>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-[#6B7280]">
          {trimester.course_count ?? 0} courses
        </p>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#6B7280] transition-all duration-150 group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
