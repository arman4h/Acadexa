import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { mockResources } from "../lib/mockData";
import type { Resource, Contribution } from "../types";

export async function getResourcesByCourse(
  courseId: string
): Promise<Resource[]> {
  if (!isSupabaseConfigured) {
    return mockResources[courseId] ?? [];
  }

  const { data, error } = await supabase!
    .from("resource")
    .select("*")
    .eq("course_id", courseId);

  if (error) throw error;
  return data ?? [];
}

export async function submitContribution(
  contribution: Contribution
): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }

  const { error } = await supabase!
    .from("contribution")
    .insert(contribution);

  if (error) throw error;
}
