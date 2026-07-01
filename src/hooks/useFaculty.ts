import { useQuery } from "@tanstack/react-query";
import { getFacultyById, searchFaculty } from "../services/facultyService";

export function useFaculty(id: string) {
  return useQuery({
    queryKey: ["faculty", id],
    queryFn: () => getFacultyById(id),
    enabled: !!id,
  });
}

export function useSearchFaculty(query: string) {
  return useQuery({
    queryKey: ["faculty", "search", query],
    queryFn: () => searchFaculty(query),
    enabled: query.length > 0,
  });
}
