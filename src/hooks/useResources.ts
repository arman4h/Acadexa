import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getResourcesByCourse,
  getContributorsByCourse,
  submitContribution,
  getContributions,
  approveContribution,
  deleteContribution,
} from "../services/resourceService";
import type { Contribution } from "../types";

export function useResourcesByCourse(courseId: string) {
  return useQuery({
    queryKey: ["resources", "course", courseId],
    queryFn: () => getResourcesByCourse(courseId),
    enabled: !!courseId,
  });
}

export function useContributorsByCourse(courseId: string) {
  return useQuery({
    queryKey: ["contributors", courseId],
    queryFn: () => getContributorsByCourse(courseId),
    enabled: !!courseId,
  });
}

export function useSubmitContribution() {
  return useMutation({
    mutationFn: (contribution: Contribution) => submitContribution(contribution),
  });
}

export function useContributions() {
  return useQuery({
    queryKey: ["contributions"],
    queryFn: getContributions,
  });
}

export function useApproveContribution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteContribution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContribution(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contributions"] }),
  });
}
