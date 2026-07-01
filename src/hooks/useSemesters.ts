import { useQuery } from "@tanstack/react-query";
import { getSemesters, getSemesterById } from "../services/semesterService";

export function useSemesters() {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: getSemesters,
  });
}

export function useSemester(id: string) {
  return useQuery({
    queryKey: ["semester", id],
    queryFn: () => getSemesterById(id),
    enabled: !!id,
  });
}
