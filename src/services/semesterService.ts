import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  mockSemesters,
  getMockSemesterById,
} from "../lib/mockData";
import type { Semester } from "../types";

export async function getSemesters(): Promise<Semester[]> {
  if (!isSupabaseConfigured) {
    return mockSemesters;
  }

  const { data, error } = await supabase!
    .from("semester")
    .select("*, course:course(count)")
    .order("order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    order: s.order,
    course_count: s.course?.[0]?.count ?? 0,
  }));
}

export async function getSemesterById(id: string): Promise<Semester | null> {
  if (!isSupabaseConfigured) {
    return getMockSemesterById(id) ?? null;
  }

  const { data, error } = await supabase!
    .from("semester")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
