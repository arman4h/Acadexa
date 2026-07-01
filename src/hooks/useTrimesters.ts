import { useQuery } from "@tanstack/react-query";
import { getTrimesters, getTrimesterById } from "../services/trimesterService";

export function useTrimesters() {
  return useQuery({
    queryKey: ["trimesters"],
    queryFn: getTrimesters,
  });
}

export function useTrimester(id: string) {
  return useQuery({
    queryKey: ["trimester", id],
    queryFn: () => getTrimesterById(id),
    enabled: !!id,
  });
}
