import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "../../services/courseService";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { EmptyState } from "../../components/ui/EmptyState";
import type { Course } from "../../types";

export function AdminCourses() {
  const queryClient = useQueryClient();
  const { data: courses } = useQuery({ queryKey: ["courses", "all"], queryFn: getAllCourses });

  const [editing, setEditing] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [trimester, setTrimester] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");

  const createMut = useMutation({
    mutationFn: () => createCourse({ trimester: parseInt(trimester), course_code: courseCode, course_name: courseName, description: description || undefined }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["courses"] }); resetForm(); },
  });

  const updateMut = useMutation({
    mutationFn: () => updateCourse(editing!.id, { trimester: parseInt(trimester), course_code: courseCode, course_name: courseName, description: description || undefined }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["courses"] }); resetForm(); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  function resetForm() { setShowForm(false); setEditing(null); setTrimester(""); setCourseCode(""); setCourseName(""); setDescription(""); }

  function startEdit(c: Course) {
    setEditing(c); setTrimester(String(c.trimester));
    setCourseCode(c.course_code); setCourseName(c.course_name); setDescription(c.description ?? ""); setShowForm(true);
  }

  function startCreate() {
    setEditing(null); setTrimester("1");
    setCourseCode(""); setCourseName(""); setDescription(""); setShowForm(true);
  }

  const trimesterOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937]">Courses</h1>
        <Button onClick={startCreate}><Plus className="w-4 h-4" /> Add Course</Button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#EAECEF] bg-white p-5 mb-6">
          <h2 className="font-semibold text-[#1F2937] mb-4">{editing ? "Edit Course" : "New Course"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Trimester</label>
              <select value={trimester} onChange={(e) => setTrimester(e.target.value)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10">
                {trimesterOptions.map((t) => <option key={t} value={String(t)}>Trimester {t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Course Code</label>
              <Input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} placeholder="e.g. CSE 1110" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Course Name</label>
              <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} placeholder="e.g. Introduction to Computer Systems" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1F2937] mb-1">Description (optional)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 resize-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => (editing ? updateMut : createMut).mutate()} disabled={createMut.isPending || updateMut.isPending || !courseCode || !courseName}>
              {editing ? "Save" : "Create"}
            </Button>
            <Button variant="secondary" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {!courses?.length && <EmptyState title="No courses" description="Add a course to get started." />}

      <div className="space-y-2">
        {courses?.map((c) => (
          <div key={c.id} className="rounded-2xl border border-[#EAECEF] bg-white p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937]">{c.course_name}</p>
              <p className="text-sm text-[#4F7CFF]">{c.course_code} — Trimester {c.trimester}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => startEdit(c)} className="p-2 rounded-xl text-[#6B7280] hover:text-[#4F7CFF] hover:bg-[#EAECEF]/50 transition-all duration-150 cursor-pointer" aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => deleteMut.mutate(c.id)} className="p-2 rounded-xl text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-150 cursor-pointer" aria-label="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
