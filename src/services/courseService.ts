import { supabase, isSupabaseConfigured } from "../lib/supabase";
import * as mock from "../lib/mockData";
import type { Course } from "../types";

async function attachResourceCounts(courses: Course[]): Promise<Course[]> {
  if (courses.length === 0) return courses;
  const { data: rows, error } = await supabase!
    .from("resource").select("course_id");
  if (error) throw error;
  const counts = new Map<number, number>();
  for (const r of rows ?? []) {
    counts.set(r.course_id, (counts.get(r.course_id) ?? 0) + 1);
  }
  return courses.map((c) => ({ ...c, resource_count: counts.get(parseInt(c.id)) ?? 0 }));
}

export async function getCoursesByTrimester(trimesterNumber: number): Promise<Course[]> {
  if (!isSupabaseConfigured) return mock.getCoursesByTrimester(trimesterNumber);

  const { data, error } = await supabase!
    .from("course").select("*").eq("trimester", trimesterNumber);
  if (error) throw error;
  const courses = (data ?? []).map((c) => ({
    id: String(c.id), trimester: c.trimester,
    course_code: c.course_code, course_name: c.course_name, description: c.description,
  }));
  return attachResourceCounts(courses);
}

export async function getCourseById(id: string): Promise<Course | null> {
  if (!isSupabaseConfigured) return mock.getCourseById(id) ?? null;

  const { data, error } = await supabase!
    .from("course").select("*").eq("id", parseInt(id)).single();
  if (error) throw error;
  if (!data) return null;
  const course: Course = {
    id: String(data.id), trimester: data.trimester,
    course_code: data.course_code, course_name: data.course_name, description: data.description,
  };
  const [withCount] = await attachResourceCounts([course]);
  return withCount;
}

export async function getAllCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured) return mock.getAllCourses();

  const { data, error } = await supabase!
    .from("course").select("*");
  if (error) throw error;
  const courses = (data ?? []).map((c: any) => ({
    id: String(c.id), trimester: c.trimester,
    course_code: c.course_code, course_name: c.course_name, description: c.description,
  }));
  return attachResourceCounts(courses);
}

export async function searchCourses(query: string): Promise<Course[]> {
  if (!isSupabaseConfigured) return mock.searchCourses(query);

  const { data, error } = await supabase!
    .from("course").select("*")
    .or(`course_name.ilike.%${query}%,course_code.ilike.%${query}%`);
  if (error) throw error;
  const courses = (data ?? []).map((c) => ({
    id: String(c.id), trimester: c.trimester,
    course_code: c.course_code, course_name: c.course_name, description: c.description,
  }));
  return attachResourceCounts(courses);
}

export async function createCourse(data: {
  trimester: number; course_code: string; course_name: string; description?: string;
}): Promise<Course> {
  if (!isSupabaseConfigured) return mock.createCourse(data);

  const { data: result, error } = await supabase!
    .from("course").insert(data).select().single();
  if (error) throw error;
  return { id: String(result.id), trimester: result.trimester, course_code: result.course_code, course_name: result.course_name, description: result.description, resource_count: 0 };
}

export async function updateCourse(id: string, data: {
  trimester?: number; course_code?: string; course_name?: string; description?: string;
}): Promise<Course | null> {
  if (!isSupabaseConfigured) return mock.updateCourse(id, data);

  const updateFields: Record<string, unknown> = {};
  if (data.trimester !== undefined) updateFields.trimester = data.trimester;
  if (data.course_code !== undefined) updateFields.course_code = data.course_code;
  if (data.course_name !== undefined) updateFields.course_name = data.course_name;
  if (data.description !== undefined) updateFields.description = data.description;

  const { data: result, error } = await supabase!
    .from("course").update(updateFields).eq("id", parseInt(id)).select().single();
  if (error) throw error;
  return result ? { id: String(result.id), trimester: result.trimester, course_code: result.course_code, course_name: result.course_name, description: result.description } : null;
}

export async function deleteCourse(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return mock.deleteCourse(id);

  const { error } = await supabase!.from("course").delete().eq("id", parseInt(id));
  if (error) throw error;
  return true;
}
