import { useQuery } from "@tanstack/react-query";
import {
  getCoursesBySemester,
  getCourseById,
  searchCourses,
} from "../services/courseService";

export function useCoursesBySemester(semesterId: string) {
  return useQuery({
    queryKey: ["courses", "semester", semesterId],
    queryFn: () => getCoursesBySemester(semesterId),
    enabled: !!semesterId,
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
