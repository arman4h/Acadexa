import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getResourcesByCourse,
  submitContribution,
} from "../services/resourceService";
import type { Contribution } from "../types";

export function useResourcesByCourse(courseId: string) {
  return useQuery({
    queryKey: ["resources", "course", courseId],
    queryFn: () => getResourcesByCourse(courseId),
    enabled: !!courseId,
  });
}

export function useSubmitContribution() {
  return useMutation({
    mutationFn: (contribution: Contribution) =>
      submitContribution(contribution),
  });
}
