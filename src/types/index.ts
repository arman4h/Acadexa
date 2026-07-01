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
