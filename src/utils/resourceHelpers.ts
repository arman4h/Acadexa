import {
  ListVideo,
  Folder,
  FolderGit,
  FileQuestion,
  StickyNote,
  Book,
  FileText,
  Globe,
  Link,
  type LucideIcon,
} from "lucide-react";
import type { ResourceType, Resource } from "../types";

const resourceIconMap: Record<ResourceType, LucideIcon> = {
  playlist: ListVideo,
  drive: Folder,
  github: FolderGit,
  question_bank: FileQuestion,
  notes: StickyNote,
  book: Book,
  pdf: FileText,
  website: Globe,
  other: Link,
};

export function getResourceIcon(type: ResourceType): LucideIcon {
  return resourceIconMap[type] ?? Link;
}

export function getResourceTypeLabel(type: ResourceType): string {
  const labels: Record<ResourceType, string> = {
    playlist: "Playlist",
    drive: "Drive",
    github: "GitHub",
    question_bank: "Question Bank",
    notes: "Notes",
    book: "Book",
    pdf: "PDF",
    website: "Website",
    other: "Other",
  };
  return labels[type] ?? "Other";
}

export const resourceTypes: { value: ResourceType; label: string }[] = [
  { value: "playlist", label: "Playlist" },
  { value: "drive", label: "Drive" },
  { value: "github", label: "GitHub" },
  { value: "question_bank", label: "Question Bank" },
  { value: "notes", label: "Notes" },
  { value: "book", label: "Book" },
  { value: "pdf", label: "PDF" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];

export function filterResourcesByType(
  resources: Resource[],
  type?: ResourceType
): Resource[] {
  if (!type || type === "other") return resources;
  return resources.filter((r) => r.type === type);
}

export function openResourceUrl(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}
