import type { Semester, Course, Resource } from "../types";

export const mockSemesters: Semester[] = [
  { id: "1", name: "Semester 1", order: 1, course_count: 4 },
  { id: "2", name: "Semester 2", order: 2, course_count: 4 },
  { id: "3", name: "Semester 3", order: 3, course_count: 5 },
  { id: "4", name: "Semester 4", order: 4, course_count: 5 },
  { id: "5", name: "Semester 5", order: 5, course_count: 5 },
  { id: "6", name: "Semester 6", order: 6, course_count: 4 },
];

export const mockCourses: Record<string, Course[]> = {
  "1": [
    {
      id: "c1",
      semester_id: "1",
      faculty_id: "f1",
      course_code: "CS101",
      course_name: "Introduction to Computer Science",
      description: "Fundamentals of computer science including algorithms, data structures, and programming concepts.",
      faculty: { id: "f1", name: "Dr. Sarah Chen", email: "sarah.chen@university.edu" },
      semester: { id: "1", name: "Semester 1", order: 1 },
      resource_count: 5,
    },
    {
      id: "c2",
      semester_id: "1",
      faculty_id: "f2",
      course_code: "MATH101",
      course_name: "Calculus I",
      description: "Limits, derivatives, integrals, and the fundamental theorem of calculus.",
      faculty: { id: "f2", name: "Prof. James Miller" },
      semester: { id: "1", name: "Semester 1", order: 1 },
      resource_count: 3,
    },
    {
      id: "c3",
      semester_id: "1",
      faculty_id: "f3",
      course_code: "ENG101",
      course_name: "English Composition",
      description: "Develop academic writing skills including argumentation, analysis, and research.",
      faculty: { id: "f3", name: "Dr. Emily Watson" },
      semester: { id: "1", name: "Semester 1", order: 1 },
      resource_count: 4,
    },
    {
      id: "c4",
      semester_id: "1",
      faculty_id: "f4",
      course_code: "PHY101",
      course_name: "Physics I",
      description: "Classical mechanics, thermodynamics, and wave phenomena.",
      faculty: { id: "f4", name: "Prof. Robert Lee" },
      semester: { id: "1", name: "Semester 1", order: 1 },
      resource_count: 6,
    },
  ],
  "2": [
    {
      id: "c5",
      semester_id: "2",
      faculty_id: "f1",
      course_code: "CS201",
      course_name: "Data Structures",
      description: "Advanced data structures including trees, graphs, hash tables, and their algorithms.",
      faculty: { id: "f1", name: "Dr. Sarah Chen" },
      semester: { id: "2", name: "Semester 2", order: 2 },
      resource_count: 4,
    },
    {
      id: "c6",
      semester_id: "2",
      faculty_id: "f5",
      course_code: "MATH201",
      course_name: "Linear Algebra",
      description: "Vector spaces, matrices, linear transformations, and eigenvalues.",
      faculty: { id: "f5", name: "Dr. Michael Park" },
      semester: { id: "2", name: "Semester 2", order: 2 },
      resource_count: 3,
    },
    {
      id: "c7",
      semester_id: "2",
      faculty_id: "f4",
      course_code: "PHY201",
      course_name: "Physics II",
      description: "Electromagnetism, optics, and modern physics.",
      faculty: { id: "f4", name: "Prof. Robert Lee" },
      semester: { id: "2", name: "Semester 2", order: 2 },
      resource_count: 5,
    },
    {
      id: "c8",
      semester_id: "2",
      faculty_id: "f6",
      course_code: "STA201",
      course_name: "Probability and Statistics",
      description: "Probability theory, statistical inference, and data analysis.",
      faculty: { id: "f6", name: "Dr. Lisa Thompson" },
      semester: { id: "2", name: "Semester 2", order: 2 },
      resource_count: 4,
    },
  ],
  "3": [
    {
      id: "c9",
      semester_id: "3",
      faculty_id: "f1",
      course_code: "CS301",
      course_name: "Algorithms",
      description: "Design and analysis of algorithms, complexity theory, and optimization.",
      faculty: { id: "f1", name: "Dr. Sarah Chen" },
      semester: { id: "3", name: "Semester 3", order: 3 },
      resource_count: 5,
    },
    {
      id: "c10",
      semester_id: "3",
      faculty_id: "f7",
      course_code: "CS302",
      course_name: "Computer Architecture",
      description: "Processor design, memory hierarchy, pipelining, and parallel processing.",
      faculty: { id: "f7", name: "Prof. David Kim" },
      semester: { id: "3", name: "Semester 3", order: 3 },
      resource_count: 3,
    },
    {
      id: "c11",
      semester_id: "3",
      faculty_id: "f8",
      course_code: "CS303",
      course_name: "Software Engineering",
      description: "Software development methodologies, design patterns, and project management.",
      faculty: { id: "f8", name: "Dr. Amanda Foster" },
      semester: { id: "3", name: "Semester 3", order: 3 },
      resource_count: 4,
    },
  ],
};

export const mockResources: Record<string, Resource[]> = {
  c1: [
    {
      id: "r1",
      course_id: "c1",
      type: "playlist",
      title: "CS101 - Full Course Playlist",
      description: "Complete video series covering all topics in Introduction to Computer Science.",
      url: "https://youtube.com/playlist?example=cs101",
    },
    {
      id: "r2",
      course_id: "c1",
      type: "drive",
      title: "Lecture Slides & Notes",
      description: "Google Drive folder with all lecture slides and supplementary notes.",
      url: "https://drive.google.com/drive/folders/example-cs101",
    },
    {
      id: "r3",
      course_id: "c1",
      type: "question_bank",
      title: "Practice Questions - Midterm",
      description: "Collection of practice questions from previous midterm exams.",
      url: "https://example.com/cs101-midterm-practice",
    },
    {
      id: "r4",
      course_id: "c1",
      type: "github",
      title: "Course Code Examples",
      description: "GitHub repository with all code examples demonstrated in class.",
      url: "https://github.com/example/cs101-examples",
    },
    {
      id: "r5",
      course_id: "c1",
      type: "book",
      title: "Structure and Interpretation of Computer Programs",
      description: "Classic textbook covering the fundamental concepts of computer programming.",
      url: "https://example.com/sicp",
    },
  ],
  c2: [
    {
      id: "r6",
      course_id: "c2",
      type: "playlist",
      title: "Calculus I - Video Lectures",
      description: "Comprehensive video lectures covering all calculus topics.",
      url: "https://youtube.com/playlist?example=calc1",
    },
    {
      id: "r7",
      course_id: "c2",
      type: "pdf",
      title: "Formula Sheet",
      description: "Quick reference sheet with all important calculus formulas.",
      url: "https://example.com/calc1-formulas",
    },
    {
      id: "r8",
      course_id: "c2",
      type: "notes",
      title: "Student Notes - Fall 2024",
      description: "Well-organized notes from a previous semester.",
      url: "https://example.com/calc1-notes",
    },
  ],
  c3: [
    {
      id: "r9",
      course_id: "c3",
      type: "drive",
      title: "Writing Resources",
      description: "Writing guides, templates, and sample essays.",
      url: "https://drive.google.com/drive/folders/example-eng101",
    },
    {
      id: "r10",
      course_id: "c3",
      type: "website",
      title: "Purdue OWL Writing Lab",
      description: "Excellent resource for writing, research, and citation guides.",
      url: "https://owl.purdue.edu",
    },
    {
      id: "r11",
      course_id: "c3",
      type: "notes",
      title: "Grammar and Style Notes",
      description: "Comprehensive notes on grammar, style, and academic writing conventions.",
      url: "https://example.com/eng101-grammar",
    },
    {
      id: "r12",
      course_id: "c3",
      type: "book",
      title: "The Elements of Style",
      description: "The classic guide to English writing style by Strunk and White.",
      url: "https://example.com/elements-of-style",
    },
  ],
  c4: [
    {
      id: "r13",
      course_id: "c4",
      type: "playlist",
      title: "Physics I - MIT OCW",
      description: "MIT OpenCourseWare physics lectures by Professor Walter Lewin.",
      url: "https://youtube.com/playlist?example=physics1",
    },
    {
      id: "r14",
      course_id: "c4",
      type: "question_bank",
      title: "Problem Sets with Solutions",
      description: "Collection of problem sets and their detailed solutions.",
      url: "https://example.com/phy101-problems",
    },
    {
      id: "r15",
      course_id: "c4",
      type: "pdf",
      title: "Lab Manual",
      description: "Complete laboratory manual for all physics experiments.",
      url: "https://example.com/phy101-lab-manual",
    },
  ],
};

export function getMockSemesterById(id: string): Semester | undefined {
  return mockSemesters.find((s) => s.id === id);
}

export function getMockCourseById(id: string): Course | undefined {
  for (const courses of Object.values(mockCourses)) {
    const found = courses.find((c) => c.id === id);
    if (found) return found;
  }
  return undefined;
}

export function searchMockCourses(query: string): Course[] {
  const q = query.toLowerCase();
  const results: Course[] = [];
  for (const courses of Object.values(mockCourses)) {
    for (const course of courses) {
      if (
        course.course_name.toLowerCase().includes(q) ||
        course.course_code.toLowerCase().includes(q) ||
        course.faculty?.name.toLowerCase().includes(q)
      ) {
        results.push(course);
      }
    }
  }
  return results;
}
