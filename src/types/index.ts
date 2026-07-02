export interface Trimester {
  id: string;
  name: string;
  order: number;
  course_count?: number;
}

export interface Course {
  id: string;
  trimester: number;
  course_code: string;
  course_name: string;
  description?: string;
  resource_count?: number;
}

export type ResourceType =
  | "playlist"
  | "drive"
  | "github"
  | "question_bank"
  | "notes"
  | "book"
  | "pdf"
  | "website"
  | "other";

export interface Resource {
  id: string;
  course_id: string;
  type: ResourceType;
  title: string;
  description?: string;
  url: string;
  author?: string;
  contributor_name?: string;
  contributor_url?: string;
}

export interface Contribution {
  id?: string;
  course_id: string;
  type: ResourceType;
  title: string;
  description?: string;
  url: string;
  author?: string;
  contributor_name?: string;
  contributor_url?: string;
  created_at?: string;
}

export type AdminRole = "super_admin" | "admin";

export interface AdminUser {
  id: string;
  username: string;
  full_name?: string;
  role: AdminRole;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ActivityLog {
  id: string;
  actor_id?: string;
  actor_username: string;
  actor_role: AdminRole;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: Record<string, unknown> | null;
  created_at?: string;
}
