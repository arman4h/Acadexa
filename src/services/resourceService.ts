import { supabase, isSupabaseConfigured } from "../lib/supabase";
import * as mock from "../lib/mockData";
import type { Resource, Contribution } from "../types";

export async function getResourcesByCourse(courseId: string): Promise<Resource[]> {
  if (!isSupabaseConfigured) return mock.getResourcesByCourse(courseId);

  const { data, error } = await supabase!
    .from("resource")
    .select("*")
    .eq("course_id", parseInt(courseId));
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, id: String(r.id), course_id: String(r.course_id) }));
}

export async function getContributorsByCourse(courseId: string): Promise<{ name: string; url?: string }[]> {
  if (!isSupabaseConfigured) return mock.getContributorsByCourse(courseId);

  const { data, error } = await supabase!
    .from("resource")
    .select("contributor_name, contributor_url")
    .eq("course_id", parseInt(courseId));
  if (error) throw error;
  const map = new Map<string, { name: string; url?: string }>();
  for (const r of data ?? []) {
    if (r.contributor_name) map.set(r.contributor_name, { name: r.contributor_name, url: r.contributor_url });
  }
  return Array.from(map.values());
}

export async function createResource(data: {
  course_id: string; type: string; title: string; description?: string; url: string;
  author?: string; contributor_name?: string; contributor_url?: string;
}): Promise<Resource> {
  if (!isSupabaseConfigured) return mock.createResource(data);

  const dbData = { ...data, course_id: parseInt(data.course_id) };
  const { data: result, error } = await supabase!
    .from("resource").insert(dbData).select().single();
  if (error) throw error;
  return { ...result, id: String(result.id), course_id: String(result.course_id) };
}

export async function updateResource(id: string, data: {
  course_id?: string; type?: string; title?: string; description?: string; url?: string;
  author?: string; contributor_name?: string; contributor_url?: string;
}): Promise<Resource | null> {
  if (!isSupabaseConfigured) return mock.updateResource(id, data);

  const updateFields: Record<string, unknown> = {};
  if (data.course_id !== undefined) updateFields.course_id = parseInt(data.course_id);
  if (data.type !== undefined) updateFields.type = data.type;
  if (data.title !== undefined) updateFields.title = data.title;
  if (data.description !== undefined) updateFields.description = data.description;
  if (data.url !== undefined) updateFields.url = data.url;
  if (data.author !== undefined) updateFields.author = data.author;
  if (data.contributor_name !== undefined) updateFields.contributor_name = data.contributor_name;
  if (data.contributor_url !== undefined) updateFields.contributor_url = data.contributor_url;

  const { data: result, error } = await supabase!
    .from("resource").update(updateFields).eq("id", parseInt(id)).select().single();
  if (error) throw error;
  return result ? { ...result, id: String(result.id), course_id: String(result.course_id) } : null;
}

export async function deleteResource(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return mock.deleteResource(id);

  const { error } = await supabase!.from("resource").delete().eq("id", parseInt(id));
  if (error) throw error;
  return true;
}

export async function getAllResources(): Promise<Resource[]> {
  if (!isSupabaseConfigured) return mock.getAllResources();

  const { data, error } = await supabase!
    .from("resource")
    .select("*");
  if (error) throw error;
  return (data ?? []).map((r) => ({ ...r, id: String(r.id), course_id: String(r.course_id) }));
}

export async function submitContribution(contribution: Contribution): Promise<void> {
  if (!isSupabaseConfigured) {
    mock.submitContribution(contribution);
    return;
  }

  const dbData = { ...contribution, course_id: parseInt(contribution.course_id) };
  const { error } = await supabase!
    .from("contribution").insert(dbData);
  if (error) throw error;
}

export async function getContributions(): Promise<Contribution[]> {
  if (!isSupabaseConfigured) return mock.getContributions();

  const { data, error } = await supabase!
    .from("contribution").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((c) => ({ ...c, id: String(c.id), course_id: String(c.course_id) }));
}

export async function approveContribution(id: string): Promise<Resource | null> {
  if (!isSupabaseConfigured) return mock.approveContribution(id);

  // Fetch the contribution
  const { data: contribution, error: fetchError } = await supabase!
    .from("contribution").select("*").eq("id", parseInt(id)).single();
  if (fetchError || !contribution) throw fetchError ?? new Error("Contribution not found");

  // Create a resource from it
  const resourceData = {
    course_id: contribution.course_id,
    type: contribution.type,
    title: contribution.title,
    description: contribution.description,
    url: contribution.url,
    author: contribution.author,
    contributor_name: contribution.contributor_name,
    contributor_url: contribution.contributor_url,
  };

  const { data: resource, error: insertError } = await supabase!
    .from("resource").insert(resourceData).select().single();
  if (insertError) throw insertError;

  // Delete the contribution
  await supabase!.from("contribution").delete().eq("id", parseInt(id));

  return { ...resource, id: String(resource.id), course_id: String(resource.course_id) };
}

export async function deleteContribution(id: string): Promise<boolean> {
  if (!isSupabaseConfigured) return mock.deleteContribution(id);

  const { error } = await supabase!.from("contribution").delete().eq("id", parseInt(id));
  if (error) throw error;
  return true;
}
