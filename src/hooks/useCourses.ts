import { useQuery } from "@tanstack/react-query";
import {
  getCoursesByTrimester,
  getCourseById,
  searchCourses,
} from "../services/courseService";

export function useCoursesByTrimester(trimesterNumber: number) {
  return useQuery({
    queryKey: ["courses", "trimester", trimesterNumber],
    queryFn: () => getCoursesByTrimester(trimesterNumber),
    enabled: trimesterNumber >= 1 && trimesterNumber <= 12,
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
}

export function useSearchCourses(query: string) {
  return useQuery({
    queryKey: ["courses", "search", query],
    queryFn: () => searchCourses(query),
    enabled: query.length > 0,
  });
}
