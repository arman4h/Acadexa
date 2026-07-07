import { useState, useRef, useEffect } from "react";
import { CheckCircle, Loader2, Search, Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { SectionTitle } from "../components/ui/SectionTitle";
import { SEO } from "../components/SEO";
import { useSubmitContribution } from "../hooks/useResources";
import { useAllCourses } from "../hooks/useCourses";
import { uploadPdf } from "../lib/storage";
import { resourceTypes } from "../utils/resourceHelpers";
import type { ResourceType } from "../types";

export function Contribute() {
  const { data: courses = [] } = useAllCourses();
  const [courseId, setCourseId] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [resourceType, setResourceType] = useState<ResourceType>("website");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [contributorName, setContributorName] = useState("");
  const [contributorUrl, setContributorUrl] = useState("");
  const [success, setSuccess] = useState(false);

  // PDF upload state
  const [inputMode, setInputMode] = useState<"link" | "pdf">("link");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useSubmitContribution();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false);
      }
    }

    if (showCourseDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCourseDropdown]);

  const selectedCourse = courses.find((c) => String(c.id) === courseId);
  const filteredCourses = courseSearch
    ? courses.filter(
        (c) =>
          c.course_name.toLowerCase().includes(courseSearch.toLowerCase()) ||
          c.course_code.toLowerCase().includes(courseSearch.toLowerCase())
      )
    : courses;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    let finalUrl = url;
    let finalType = resourceType;

    // Handle PDF upload
    if (inputMode === "pdf" && selectedFile) {
      setUploading(true);
      try {
        finalUrl = await uploadPdf(selectedFile);
        finalType = "pdf";
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Failed to upload PDF. Please try again.");
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    try {
      await mutation.mutateAsync({
        course_id: courseId,
        type: finalType,
        title,
        description: description || undefined,
        url: finalUrl,
        author: author || undefined,
        contributor_name: contributorName || undefined,
        contributor_url: contributorUrl || undefined,
      });
      setSuccess(true);
      setCourseId("");
      setCourseSearch("");
      setResourceType("website");
      setTitle("");
      setDescription("");
      setUrl("");
      setAuthor("");
      setContributorName("");
      setContributorUrl("");
      setSelectedFile(null);
      setInputMode("link");
    } catch {
      /* handled by mutation state */
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12 text-center">
        <div className="rounded-2xl bg-green-50 dark:bg-green-950 p-4 w-fit mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] dark:text-slate-100">Thank you!</h2>
        <p className="text-[#6B7280] dark:text-slate-400 mt-2">
          Your resource has been submitted and will be reviewed by the admin team before being published.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setSuccess(false)}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <SEO
        title="Contribute"
        description="Help fellow UIU CSE students by sharing useful resources. Submit playlists, notes, question banks, and study materials for United International University courses."
        url="/contribute"
        keywords="contribute UIU resources, submit CSE resources, UIU CSE contributions, United International University study materials"
      />
      <SectionTitle subtitle="Help fellow students by sharing useful resources. Submissions are reviewed by the admin team before publishing.">
        Contribute
      </SectionTitle>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div ref={dropdownRef}>
          <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">
            Select Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div
              className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 cursor-pointer flex items-center justify-between dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              onClick={() => setShowCourseDropdown(!showCourseDropdown)}
            >
              <span className={selectedCourse ? "text-[#1F2937] dark:text-slate-100" : "text-[#6B7280] dark:text-slate-500"}>
                {selectedCourse ? `${selectedCourse.course_code} — ${selectedCourse.course_name}` : "Select a course..."}
              </span>
            </div>

            {showCourseDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#EAECEF] dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-10 max-h-64 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-[#EAECEF] dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#EAECEF] dark:border-slate-700 outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 text-sm bg-white dark:bg-slate-950 text-[#1F2937] dark:text-slate-100"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          setCourseId(String(course.id));
                          setShowCourseDropdown(false);
                          setCourseSearch("");
                        }}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                          String(course.id) === courseId
                            ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                            : "text-[#1F2937] dark:text-slate-100 hover:bg-[#EAECEF]/50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <p className="font-medium text-sm">{course.course_code}</p>
                        <p className="text-xs text-[#6B7280] dark:text-slate-400">{course.course_name}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-[#6B7280] dark:text-slate-400 text-sm">No courses found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1">Search by course code or name</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Resource Type</label>
          <select value={resourceType} onChange={(e) => setResourceType(e.target.value as ResourceType)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
            {resourceTypes.map((rt) => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Title</label>
          <Input placeholder="e.g. Introduction to Algorithms - MIT OCW" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Description (optional)</label>
          <textarea placeholder="Briefly describe what this resource covers..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 resize-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Resource</label>

          {/* Toggle between Link and PDF Upload */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => { setInputMode("link"); setSelectedFile(null); setUploadError(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                inputMode === "link"
                  ? "bg-[#4F7CFF] text-white"
                  : "bg-[#EAECEF]/60 text-[#6B7280] hover:bg-[#EAECEF] dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              <LinkIcon className="w-4 h-4" /> Paste Link
            </button>
            <button
              type="button"
              onClick={() => { setInputMode("pdf"); setUrl(""); setUploadError(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                inputMode === "pdf"
                  ? "bg-[#4F7CFF] text-white"
                  : "bg-[#EAECEF]/60 text-[#6B7280] hover:bg-[#EAECEF] dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
            >
              <Upload className="w-4 h-4" /> Upload PDF
            </button>
          </div>

          {inputMode === "link" ? (
            <Input type="url" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} required />
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 50 * 1024 * 1024) {
                      setUploadError("File size must be less than 50MB.");
                      return;
                    }
                    setSelectedFile(file);
                    setUploadError(null);
                    // Auto-set title from filename if empty
                    if (!title) {
                      setTitle(file.name.replace(/\.pdf$/i, ""));
                    }
                  }
                }}
              />
              {selectedFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-[#4F7CFF]/30 bg-[#4F7CFF]/5 px-4 py-3 dark:border-[#4F7CFF]/20 dark:bg-[#4F7CFF]/5">
                  <div className="rounded-lg bg-[#4F7CFF]/10 p-2">
                    <Upload className="w-4 h-4 text-[#4F7CFF]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-[#6B7280] dark:text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="text-xs text-[#6B7280] dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border-2 border-dashed border-[#EAECEF] dark:border-slate-700 px-6 py-8 text-center transition-all duration-150 hover:border-[#4F7CFF] hover:bg-[#4F7CFF]/5 cursor-pointer group"
                >
                  <Upload className="w-8 h-8 text-[#6B7280] dark:text-slate-400 group-hover:text-[#4F7CFF] mx-auto mb-2 transition-colors" />
                  <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100">Click to select a PDF</p>
                  <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1">Max file size: 50MB</p>
                </button>
              )}
              {uploadError && (
                <p className="text-sm text-red-500 mt-2">{uploadError}</p>
              )}
              <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1.5">
                PDF will be uploaded to cloud storage and a shareable link will be generated automatically.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[#EAECEF] dark:border-slate-800 pt-5">
          <p className="text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-3">Credits</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Author (optional)</label>
              <Input placeholder="Teacher or content creator name" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1">For playlists: teacher name. For notes: writer name. For books: author name.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Your Name (optional)</label>
              <Input placeholder="e.g. Rahim Uddin" value={contributorName} onChange={(e) => setContributorName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] dark:text-slate-100 mb-1.5">Your Contact URL (optional)</label>
              <Input placeholder="Facebook, LinkedIn, or any contact link" value={contributorUrl} onChange={(e) => setContributorUrl(e.target.value)} />
              <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-1">Your name will appear in the contributors list with this link.</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending || uploading || !courseId || (inputMode === "pdf" && !selectedFile) || (inputMode === "link" && !url)}>
          {(mutation.isPending || uploading) ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {uploading ? "Uploading PDF..." : "Submitting..."}</>
          ) : (
            "Submit for Admin Review"
          )}
        </Button>

        {mutation.isError && (
          <p className="text-sm text-red-500 text-center">{mutation.error?.message ?? "Something went wrong."}</p>
        )}
      </form>
    </div>
  );
}
