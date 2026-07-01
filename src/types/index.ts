export interface Semester {
  id: string;
  name: string;
  order: number;
  course_count?: number;
}

export interface Faculty {
  id: string;
  name: string;
  email?: string;
}

export interface Course {
  id: string;
  semester_id: string;
  faculty_id: string;
  course_code: string;
  course_name: string;
  description?: string;
  semester?: Semester;
  faculty?: Faculty;
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
}

export interface Contribution {
  id?: string;
  course_id: string;
  resource_type: ResourceType;
  title: string;
  description?: string;
  url: string;
  created_at?: string;
}
