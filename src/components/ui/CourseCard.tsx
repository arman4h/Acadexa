import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../../types";
import { Badge } from "./Badge";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="group block rounded-2xl border border-[#EAECEF] bg-white p-5 transition-all duration-150 hover:shadow-md hover:border-[#4F7CFF]/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[#4F7CFF]/30"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 w-fit">
          <BookOpen className="w-4 h-4 text-[#4F7CFF]" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-[#6B7280] dark:text-slate-400 transition-all duration-150 group-hover:text-[#4F7CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h4 className="font-semibold text-[#1F2937] dark:text-slate-100">{course.course_name}</h4>
      <p className="text-sm text-[#4F7CFF] font-medium mt-0.5">
        {course.course_code}
      </p>
      <div className="flex items-center gap-2 mt-3">
        <Badge variant="primary">
          {course.resource_count ?? 0} resources
        </Badge>
        {course.trimester && (
          <Badge>Trimester {course.trimester}</Badge>
        )}
      </div>
    </Link>
  );
}
