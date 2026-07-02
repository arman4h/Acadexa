import type { Trimester, Course, Resource, Contribution } from "../types";

let nextCourseId = 54;
let nextResourceId = 14;
let nextContributionId = 5;

let courses: Course[] = [
  { id: "1",  trimester: 1,  course_code: "ENG 1011",  course_name: "English – I", resource_count: 0 },
  { id: "2",  trimester: 1,  course_code: "BDS 1201",  course_name: "History of the Emergence of Bangladesh", resource_count: 0 },
  { id: "3",  trimester: 1,  course_code: "CSE 1110",  course_name: "Introduction to Computer Systems", resource_count: 0 },
  { id: "4",  trimester: 1,  course_code: "MATH 1151", course_name: "Fundamental Calculus", resource_count: 0 },
  { id: "5",  trimester: 2,  course_code: "ENG 1013",  course_name: "English – II", resource_count: 0 },
  { id: "6",  trimester: 2,  course_code: "CSE 1111",  course_name: "Structured Programming Language", resource_count: 0 },
  { id: "7",  trimester: 2,  course_code: "CSE 1112",  course_name: "Structured Programming Language Laboratory", resource_count: 0 },
  { id: "8",  trimester: 2,  course_code: "CSE 2213",  course_name: "Discrete Mathematics", resource_count: 0 },
  { id: "9",  trimester: 3,  course_code: "MATH 2183", course_name: "Calculus and Linear Algebra", resource_count: 0 },
  { id: "10", trimester: 3,  course_code: "PHY 2105",  course_name: "Physics", resource_count: 0 },
  { id: "11", trimester: 3,  course_code: "PHY 2106",  course_name: "Physics Laboratory", resource_count: 0 },
  { id: "12", trimester: 3,  course_code: "CSE 2215",  course_name: "Data Structure and Algorithms – I", resource_count: 0 },
  { id: "13", trimester: 3,  course_code: "CSE 2216",  course_name: "Data Structure and Algorithms – I Laboratory", resource_count: 0 },
  { id: "14", trimester: 4,  course_code: "MATH 2201", course_name: "Coordinate Geometry and Vector Analysis", resource_count: 0 },
  { id: "15", trimester: 4,  course_code: "CSE 1325",  course_name: "Digital Logic Design", resource_count: 0 },
  { id: "16", trimester: 4,  course_code: "CSE 1326",  course_name: "Digital Logic Design Laboratory", resource_count: 0 },
  { id: "17", trimester: 4,  course_code: "CSE 1115",  course_name: "Object Oriented Programming", resource_count: 0 },
  { id: "18", trimester: 4,  course_code: "CSE 1116",  course_name: "Object Oriented Programming Lab", resource_count: 0 },
  { id: "19", trimester: 5,  course_code: "MATH 2205", course_name: "Probability and Statistics", resource_count: 0 },
  { id: "20", trimester: 5,  course_code: "SOC 2101",  course_name: "Society, Environment and Engineering Ethics", resource_count: 0 },
  { id: "21", trimester: 5,  course_code: "CSE 2215",  course_name: "Data Structure and Algorithms – II", resource_count: 0 },
  { id: "22", trimester: 5,  course_code: "CSE 2216",  course_name: "Data Structure and Algorithms – II Laboratory", resource_count: 0 },
  { id: "23", trimester: 5,  course_code: "EEE 2113",  course_name: "Electrical Circuits", resource_count: 0 },
  { id: "24", trimester: 6,  course_code: "CSE 3521",  course_name: "Database Management Systems", resource_count: 0 },
  { id: "25", trimester: 6,  course_code: "CSE 3522",  course_name: "Database Management Systems Lab", resource_count: 0 },
  { id: "26", trimester: 6,  course_code: "EEE 2123",  course_name: "Electronics", resource_count: 0 },
  { id: "27", trimester: 6,  course_code: "EEE 2124",  course_name: "Electronics Laboratory", resource_count: 0 },
  { id: "28", trimester: 6,  course_code: "CSE 4165",  course_name: "Web Programming", resource_count: 0 },
  { id: "29", trimester: 7,  course_code: "CSE 3313",  course_name: "Computer Architecture", resource_count: 0 },
  { id: "30", trimester: 7,  course_code: "CSE 2118",  course_name: "Advanced Object Oriented Programming Lab", resource_count: 0 },
  { id: "31", trimester: 7,  course_code: "BIO 3105",  course_name: "Biology for Engineers", resource_count: 0 },
  { id: "32", trimester: 7,  course_code: "CSE 3411",  course_name: "System Analysis and Design", resource_count: 0 },
  { id: "33", trimester: 7,  course_code: "CSE 3412",  course_name: "System Analysis and Design Laboratory", resource_count: 0 },
  { id: "34", trimester: 8,  course_code: "CSE 4325",  course_name: "Microprocessors and Microcontrollers", resource_count: 0 },
  { id: "35", trimester: 8,  course_code: "CSE 4326",  course_name: "Microprocessors and Microcontrollers Laboratory", resource_count: 0 },
  { id: "36", trimester: 8,  course_code: "CSE 3421",  course_name: "Software Engineering", resource_count: 0 },
  { id: "37", trimester: 8,  course_code: "CSE 3422",  course_name: "Software Engineering Laboratory", resource_count: 0 },
  { id: "38", trimester: 8,  course_code: "CSE 3811",  course_name: "Artificial Intelligence", resource_count: 0 },
  { id: "39", trimester: 8,  course_code: "CSE 3812",  course_name: "Artificial Intelligence Lab", resource_count: 0 },
  { id: "40", trimester: 9,  course_code: "CSE 2233",  course_name: "Theory of Computation", resource_count: 0 },
  { id: "41", trimester: 9,  course_code: "GED OPT1", course_name: "General Education Optional – I", resource_count: 0 },
  { id: "42", trimester: 9,  course_code: "PMG 4101",  course_name: "Project Management", resource_count: 0 },
  { id: "43", trimester: 9,  course_code: "CSE 3711",  course_name: "Computer Networks", resource_count: 0 },
  { id: "44", trimester: 9,  course_code: "CSE 3712",  course_name: "Computer Networks Lab", resource_count: 0 },
  { id: "45", trimester: 10, course_code: "GED OPT2", course_name: "General Education Optional – II", resource_count: 0 },
  { id: "46", trimester: 10, course_code: "CSE 4000A", course_name: "Final Year Design Project – I", resource_count: 0 },
  { id: "48", trimester: 10, course_code: "CSE 4509",  course_name: "Operating Systems", resource_count: 0 },
  { id: "49", trimester: 10, course_code: "CSE 4510",  course_name: "Operating Systems Laboratory", resource_count: 0 },
  { id: "50", trimester: 11, course_code: "GED OPT3", course_name: "General Education Optional – III", resource_count: 0 },
  { id: "53", trimester: 11, course_code: "CSE 4000B", course_name: "Final Year Design Project – II", resource_count: 0 },
  { id: "54", trimester: 11, course_code: "CSE 4531",  course_name: "Computer Security", resource_count: 0 },
  { id: "55", trimester: 12, course_code: "CSE 4000C", course_name: "Final Year Design Project – III", resource_count: 0 },
  { id: "56", trimester: 12, course_code: "EEE 4261",  course_name: "Green Computing", resource_count: 0 },
];

function trimestersFromCourses(): Trimester[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    name: `Trimester ${i + 1}`,
    order: i + 1,
    course_count: courses.filter((c) => c.trimester === i + 1).length,
  }));
}

function recalcCounts() {
  for (const c of courses) {
    c.resource_count = resourcesByCourse[c.id]?.length ?? 0;
  }
}

let resourcesByCourse: Record<string, Resource[]> = {
  "3": [
    { id: "1", course_id: "3", type: "playlist", title: "Introduction to Computer Systems - Full Playlist", description: "Complete video series covering all topics.", url: "https://youtube.com/playlist?example=cs101", author: "Dr. Sarah Chen", contributor_name: "Rahim Uddin", contributor_url: "https://facebook.com/rahim" },
    { id: "2", course_id: "3", type: "drive", title: "Lecture Slides & Notes", description: "All lecture slides and supplementary notes.", url: "https://drive.google.com/drive/folders/example-cs101", author: "Dr. Sarah Chen", contributor_name: "Fatima Begum" },
    { id: "3", course_id: "3", type: "question_bank", title: "Practice Questions - Midterm", description: "Collection of practice questions from previous exams.", url: "https://example.com/cs101-midterm-practice", contributor_name: "Rahim Uddin", contributor_url: "https://facebook.com/rahim" },
    { id: "4", course_id: "3", type: "github", title: "Course Code Examples", description: "Code examples demonstrated in class.", url: "https://github.com/example/cs101-examples", author: "Prof. James Miller", contributor_name: "Prof. James Miller" },
    { id: "5", course_id: "3", type: "book", title: "Computer Systems: A Programmer's Perspective", description: "Classic textbook on computer systems.", url: "https://example.com/csapp" },
  ],
  "4": [
    { id: "6", course_id: "4", type: "playlist", title: "Calculus I - Video Lectures", description: "Comprehensive video lectures.", url: "https://youtube.com/playlist?example=calc1", author: "Prof. James Miller", contributor_name: "Rahim Uddin", contributor_url: "https://facebook.com/rahim" },
    { id: "7", course_id: "4", type: "pdf", title: "Formula Sheet", description: "Quick reference of calculus formulas.", url: "https://example.com/calc1-formulas" },
    { id: "8", course_id: "4", type: "notes", title: "Student Notes - Fall 2024", description: "Well-organized notes.", url: "https://example.com/calc1-notes", author: "Alice Johnson", contributor_name: "Alice Johnson" },
  ],
  "6": [
    { id: "9",  course_id: "6", type: "github", title: "SPL Code Examples", description: "SPL implementations in C.", url: "https://github.com/example/spl-examples", author: "Dr. Sarah Chen", contributor_name: "Dr. Sarah Chen" },
    { id: "10", course_id: "6", type: "playlist", title: "Structured Programming - Full Course", description: "Comprehensive video series.", url: "https://youtube.com/playlist?example=spl", author: "Dr. Sarah Chen" },
  ],
  "12": [
    { id: "11", course_id: "12", type: "playlist", title: "DSA - MIT 6.006", description: "MIT Intro to Algorithms.", url: "https://youtube.com/playlist?example=algorithms", author: "Prof. Erik Demaine" },
    { id: "12", course_id: "12", type: "book", title: "Introduction to Algorithms (CLRS)", description: "The definitive algorithms textbook.", url: "https://example.com/clrs" },
    { id: "13", course_id: "12", type: "github", title: "Algorithm Implementations", description: "Common algorithms implemented.", url: "https://github.com/example/algorithms", author: "Dr. Sarah Chen" },
  ],
};

let contributions: Contribution[] = [
  { id: "1", course_id: "3", type: "playlist", title: "Computer Systems - Full Playlist", url: "https://youtube.com/playlist?example=cs101", author: "Dr. Sarah Chen", contributor_name: "Rahim Uddin", contributor_url: "https://facebook.com/rahim", created_at: "2025-01-15T10:00:00Z" },
  { id: "2", course_id: "3", type: "notes", title: "Computer Systems Study Notes", description: "Handwritten notes covering all topics.", url: "https://example.com/cs101-notes", author: "Fatima Begum", contributor_name: "Fatima Begum", created_at: "2025-02-10T14:30:00Z" },
  { id: "3", course_id: "4", type: "pdf", title: "Calculus Formula Sheet", description: "All formulas in one page.", url: "https://example.com/calc-formulas", contributor_name: "Rahim Uddin", contributor_url: "https://facebook.com/rahim", created_at: "2025-01-20T09:15:00Z" },
  { id: "4", course_id: "1", type: "notes", title: "English Grammar Notes", description: "Comprehensive grammar guide.", url: "https://example.com/eng-grammar", author: "John Smith", contributor_name: "John Smith", created_at: "2025-03-05T16:45:00Z" },
];

// Read methods

export function getTrimesters(): Trimester[] {
  return trimestersFromCourses();
}

export function getTrimesterById(id: string): Trimester | undefined {
  const n = parseInt(id);
  if (n >= 1 && n <= 12) {
    const count = courses.filter((c) => c.trimester === n).length;
    return { id, name: `Trimester ${n}`, order: n, course_count: count };
  }
  return undefined;
}

export function getCoursesByTrimester(trimesterNumber: number): Course[] {
  return courses.filter((c) => c.trimester === trimesterNumber);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getResourcesByCourse(courseId: string): Resource[] {
  return resourcesByCourse[courseId] ?? [];
}

export function getContributorsByCourse(courseId: string): { name: string; url?: string }[] {
  const map = new Map<string, { name: string; url?: string }>();
  const courseResources = resourcesByCourse[courseId] ?? [];
  for (const r of courseResources) {
    if (r.contributor_name) {
      map.set(r.contributor_name, { name: r.contributor_name, url: r.contributor_url });
    }
    if (r.author && !map.has(r.author)) {
      map.set(r.author, { name: r.author });
    }
  }
  return Array.from(map.values());
}

export function searchCourses(query: string): Course[] {
  const q = query.toLowerCase();
  return courses.filter(
    (c) =>
      c.course_name.toLowerCase().includes(q) ||
      c.course_code.toLowerCase().includes(q)
  );
}

export function getAllCourses(): Course[] {
  return [...courses];
}

export function getContributions(): Contribution[] {
  return [...contributions];
}

export function getAllResources(): Resource[] {
  return Object.values(resourcesByCourse).flat();
}

export function getCourseName(id: string): string {
  return courses.find((c) => c.id === id)?.course_name ?? id;
}

// Admin mutations

export function createCourse(data: {
  trimester: number; course_code: string; course_name: string; description?: string;
}): Course {
  const id = String(nextCourseId++);
  const course: Course = { id, ...data, resource_count: 0 };
  courses.push(course);
  resourcesByCourse[id] = [];
  return course;
}

export function updateCourse(id: string, data: {
  trimester?: number; course_code?: string; course_name?: string; description?: string;
}): Course | null {
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...data };
  return courses[idx];
}

export function deleteCourse(id: string): boolean {
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  courses.splice(idx, 1);
  delete resourcesByCourse[id];
  return true;
}

export function createResource(data: {
  course_id: string; type: string; title: string; description?: string; url: string;
  author?: string; contributor_name?: string; contributor_url?: string;
}): Resource {
  const id = String(nextResourceId++);
  const resource: Resource = {
    id, course_id: data.course_id, type: data.type as Resource["type"],
    title: data.title, description: data.description, url: data.url,
    author: data.author, contributor_name: data.contributor_name, contributor_url: data.contributor_url,
  };
  if (!resourcesByCourse[data.course_id]) resourcesByCourse[data.course_id] = [];
  resourcesByCourse[data.course_id].push(resource);
  recalcCounts();
  return resource;
}

export function updateResource(id: string, data: {
  course_id?: string; type?: string; title?: string; description?: string; url?: string;
  author?: string; contributor_name?: string; contributor_url?: string;
}): Resource | null {
  for (const courseId of Object.keys(resourcesByCourse)) {
    const idx = resourcesByCourse[courseId].findIndex((r) => r.id === id);
    if (idx !== -1) {
      const updated = {
        ...resourcesByCourse[courseId][idx],
        ...data,
        type: (data.type ?? resourcesByCourse[courseId][idx].type) as Resource["type"],
      };
      if (data.course_id && data.course_id !== courseId) {
        resourcesByCourse[courseId].splice(idx, 1);
        if (!resourcesByCourse[data.course_id]) resourcesByCourse[data.course_id] = [];
        resourcesByCourse[data.course_id].push(updated);
      } else {
        resourcesByCourse[courseId][idx] = updated;
      }
      recalcCounts();
      return updated;
    }
  }
  return null;
}

export function deleteResource(id: string): boolean {
  for (const courseId of Object.keys(resourcesByCourse)) {
    const idx = resourcesByCourse[courseId].findIndex((r) => r.id === id);
    if (idx !== -1) {
      resourcesByCourse[courseId].splice(idx, 1);
      recalcCounts();
      return true;
    }
  }
  return false;
}

export function submitContribution(data: Contribution): Contribution {
  const id = String(nextContributionId++);
  const c: Contribution = { ...data, id, created_at: new Date().toISOString() };
  contributions.push(c);
  return c;
}

export function approveContribution(id: string): Resource | null {
  const idx = contributions.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const contribution = contributions[idx];
  const resource = createResource({
    course_id: contribution.course_id,
    type: contribution.type,
    title: contribution.title,
    description: contribution.description,
    url: contribution.url,
    author: contribution.author,
    contributor_name: contribution.contributor_name,
    contributor_url: contribution.contributor_url,
  });
  contributions.splice(idx, 1);
  return resource;
}

export function deleteContribution(id: string): boolean {
  const idx = contributions.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  contributions.splice(idx, 1);
  return true;
}
