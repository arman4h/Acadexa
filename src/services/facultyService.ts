import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { Faculty } from "../types";

export async function getFacultyById(id: string): Promise<Faculty | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const { data, error } = await supabase!
    .from("faculty")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function searchFaculty(query: string): Promise<Faculty[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase!
    .from("faculty")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) throw error;
  return data ?? [];
}
