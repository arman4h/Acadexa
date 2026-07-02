import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search, X, AlertCircle } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "../../services/courseService";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import type { Course } from "../../types";

export function AdminCourses() {
  const queryClient = useQueryClient();
  const { data: courses, error: fetchError } = useQuery({ queryKey: ["courses"], queryFn: getAllCourses });
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; editing: Course | null }>({ open: false, editing: null });
  const [trimester, setTrimester] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const refetch = () => queryClient.invalidateQueries({ queryKey: ["courses"] });

  const createMut = useMutation({
    mutationFn: () => createCourse({ trimester: parseInt(trimester), course_code: courseCode.trim(), course_name: courseName.trim(), description: description.trim() || undefined }),
    onSuccess: () => { refetch(); closeModal(); },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to create course"),
  });

  const updateMut = useMutation({
    mutationFn: (data: { id: string; trimester: number; course_code: string; course_name: string; description?: string }) =>
      updateCourse(data.id, data),
    onSuccess: () => { refetch(); closeModal(); },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to update course"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => refetch(),
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to delete course"),
  });

  function closeModal() {
    setModal({ open: false, editing: null });
    setTrimester(""); setCourseCode(""); setCourseName(""); setDescription(""); setError("");
  }

  function openEdit(c: Course) {
    setModal({ open: true, editing: c });
    setTrimester(String(c.trimester));
    setCourseCode(c.course_code);
    setCourseName(c.course_name);
    setDescription(c.description ?? "");
    setError("");
  }

  function openCreate() {
    setModal({ open: true, editing: null });
    setTrimester("1");
    setCourseCode(""); setCourseName(""); setDescription("");
    setError("");
  }

  function handleSave() {
    if (!courseCode.trim() || !courseName.trim()) return;
    if (modal.editing) {
      updateMut.mutate({
        id: modal.editing.id,
        trimester: parseInt(trimester),
        course_code: courseCode.trim(),
        course_name: courseName.trim(),
        description: description.trim() || undefined,
      });
    } else {
      createMut.mutate();
    }
  }

  const trimesterOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const filtered = (courses ?? []).filter(
    (c) =>
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code.toLowerCase().includes(search.toLowerCase())
  );

  const isPending = createMut.isPending || updateMut.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">Courses</h1>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Course</Button>
      </div>

      <div className="relative max-w-md mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Search courses by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 pl-11 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
        />
      </div>

      {(error || fetchError) && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-4 py-3 text-sm mb-4">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error || (fetchError instanceof Error ? fetchError.message : "Failed to load courses")}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl border border-[#EAECEF] dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937] dark:text-slate-100">{modal.editing ? "Edit Course" : "New Course"}</h2>
              <button onClick={closeModal} className="p-1.5 rounded-xl text-[#6B7280] dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-slate-200 hover:bg-[#EAECEF]/50 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1">Trimester</label>
                <select value={trimester} onChange={(e) => setTrimester(e.target.value)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
                  {trimesterOptions.map((t) => <option key={t} value={String(t)}>Trimester {t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1">Course Code</label>
                <input
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g. CSE 1110"
                  className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1">Course Name</label>
                <input
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Introduction to Computer Systems"
                  className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1">Description (optional)</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 resize-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="secondary" onClick={closeModal} disabled={isPending}>Cancel</Button>
              <Button onClick={handleSave} disabled={isPending || !courseCode.trim() || !courseName.trim()}>
                {isPending ? "Saving..." : modal.editing ? "Save" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {!courses?.length && !search && <EmptyState title="No courses" description="Add a course to get started." />}

      {!filtered.length && search && (
        <EmptyState title="No matches" description={`No courses matching "${search}".`} />
      )}

      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1F2937] dark:text-slate-100">{c.course_name}</p>
              <p className="text-sm text-[#4F7CFF]">{c.course_code} — Trimester {c.trimester}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(c)} className="p-2 rounded-xl text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] hover:bg-[#EAECEF]/50 dark:hover:bg-slate-800 transition-all duration-150 cursor-pointer" aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => { if (confirm("Delete this course?")) deleteMut.mutate(c.id); }} className="p-2 rounded-xl text-[#6B7280] dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-150 cursor-pointer" aria-label="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
