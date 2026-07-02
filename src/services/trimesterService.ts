import { supabase, isSupabaseConfigured } from "../lib/supabase";
import * as mock from "../lib/mockData";
import type { Trimester } from "../types";

export async function getTrimesters(): Promise<Trimester[]> {
  if (!isSupabaseConfigured) return mock.getTrimesters();

  const { data: courses, error } = await supabase!
    .from("course").select("trimester");
  if (error) throw error;

  const counts = new Map<number, number>();
  for (const c of courses ?? []) {
    counts.set(c.trimester, (counts.get(c.trimester) ?? 0) + 1);
  }

  return Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    name: `Trimester ${i + 1}`,
    order: i + 1,
    course_count: counts.get(i + 1) ?? 0,
  }));
}

export async function getTrimesterById(id: string): Promise<Trimester | null> {
  if (!isSupabaseConfigured) return mock.getTrimesterById(id) ?? null;

  const n = parseInt(id);
  if (isNaN(n) || n < 1 || n > 12) return null;

  const { count, error } = await supabase!
    .from("course").select("id", { count: "exact", head: true }).eq("trimester", n);
  if (error) throw error;

  return { id, name: `Trimester ${n}`, order: n, course_count: count ?? 0 };
}
