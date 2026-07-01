import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  mockCourses,
  getMockCourseById,
  searchMockCourses,
} from "../lib/mockData";
import type { Course } from "../types";

export async function getCoursesBySemester(
  semesterId: string
): Promise<Course[]> {
  if (!isSupabaseConfigured) {
    return mockCourses[semesterId] ?? [];
  }

  const { data, error } = await supabase!
    .from("course")
    .select(
      "*, faculty:faculty_id(*), resource:resource(count), semester:semester_id(*)"
    )
    .eq("semester_id", semesterId);

  if (error) throw error;

  return (data ?? []).map((c) => ({
    id: c.id,
    semester_id: c.semester_id,
    faculty_id: c.faculty_id,
    course_code: c.course_code,
    course_name: c.course_name,
    description: c.description,
    faculty: c.faculty,
    semester: c.semester,
    resource_count: c.resource?.[0]?.count ?? 0,
  }));
}

export async function getCourseById(id: string): Promise<Course | null> {
  if (!isSupabaseConfigured) {
    return getMockCourseById(id) ?? null;
  }

  const { data, error } = await supabase!
    .from("course")
    .select("*, faculty:faculty_id(*), semester:semester_id(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    semester_id: data.semester_id,
    faculty_id: data.faculty_id,
    course_code: data.course_code,
    course_name: data.course_name,
    description: data.description,
    faculty: data.faculty,
    semester: data.semester,
  };
}

export async function searchCourses(query: string): Promise<Course[]> {
  if (!isSupabaseConfigured) {
    return searchMockCourses(query);
  }

  const { data, error } = await supabase!
    .from("course")
    .select("*, faculty:faculty_id(*), semester:semester_id(*)")
    .or(`course_name.ilike.%${query}%,course_code.ilike.%${query}%`);

  if (error) throw error;

  return (data ?? []).map((c) => ({
    id: c.id,
    semester_id: c.semester_id,
    faculty_id: c.faculty_id,
    course_code: c.course_code,
    course_name: c.course_name,
    description: c.description,
    faculty: c.faculty,
    semester: c.semester,
  }));
}
