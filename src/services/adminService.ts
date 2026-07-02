import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { AdminRole, AdminUser, ActivityLog } from "../types";

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase!
    .from("admin_user")
    .select("id, username, full_name, role, is_active, created_at, updated_at")
    .eq("username", username)
    .maybeSingle();
  if (error) throw error;
  return data as AdminUser | null;
}

export async function loginAdmin(username: string, password: string): Promise<AdminUser | null> {
  if (!isSupabaseConfigured) return null;
  const user = await getAdminByUsername(username);
  if (!user || user.is_active === false) return null;

  const { data: credential, error: credentialError } = await supabase!
    .from("admin_credential")
    .select("password_hash")
    .eq("admin_user_id", user.id)
    .maybeSingle();
  if (credentialError) throw credentialError;
  if (!credential || credential.password_hash !== password) return null;

  return user;
}

export async function getAllAdmins(): Promise<AdminUser[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase!
    .from("admin_user")
    .select("id, username, full_name, role, is_active, created_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as AdminUser[];
}

export async function createAdmin(data: {
  username: string;
  full_name?: string;
  password: string;
  role: AdminRole;
}): Promise<AdminUser> {
  if (!isSupabaseConfigured) throw new Error("Supabase is required for admin management.");

  const { data: user, error: userError } = await supabase!
    .from("admin_user")
    .insert({ username: data.username, full_name: data.full_name, role: data.role, is_active: true })
    .select("id, username, full_name, role, is_active, created_at, updated_at")
    .single();
  if (userError) throw userError;

  const { error: credentialError } = await supabase!
    .from("admin_credential")
    .insert({ admin_user_id: user.id, password_hash: data.password });
  if (credentialError) throw credentialError;

  return user as AdminUser;
}

export async function updateAdminRole(id: string, role: AdminRole): Promise<AdminUser> {
  if (!isSupabaseConfigured) throw new Error("Supabase is required for admin management.");
  const { data, error } = await supabase!
    .from("admin_user")
    .update({ role })
    .eq("id", id)
    .select("id, username, full_name, role, is_active, created_at, updated_at")
    .single();
  if (error) throw error;
  return data as AdminUser;
}

export async function deleteAdmin(id: string): Promise<void> {
  if (!isSupabaseConfigured) throw new Error("Supabase is required for admin management.");

  const { error: credentialError } = await supabase!
    .from("admin_credential")
    .delete()
    .eq("admin_user_id", id);
  if (credentialError) throw credentialError;

  const { error: userError } = await supabase!
    .from("admin_user")
    .delete()
    .eq("id", id);
  if (userError) throw userError;
}

export async function setAdminActive(id: string, is_active: boolean): Promise<AdminUser> {
  if (!isSupabaseConfigured) throw new Error("Supabase is required for admin management.");
  const { data, error } = await supabase!
    .from("admin_user")
    .update({ is_active })
    .eq("id", id)
    .select("id, username, full_name, role, is_active, created_at, updated_at")
    .single();
  if (error) throw error;
  return data as AdminUser;
}

export async function getActivityLogs(limit = 100): Promise<ActivityLog[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase!
    .from("activity_log")
    .select("id, actor_id, actor_username, actor_role, action, entity_type, entity_id, details, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ActivityLog[];
}

export async function writeActivityLog(entry: {
  actor_id?: string;
  actor_username: string;
  actor_role: AdminRole;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: Record<string, unknown> | null;
}) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase!
    .from("activity_log")
    .insert(entry);
  if (error) throw error;
}
