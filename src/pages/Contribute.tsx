import { useState, useRef, useEffect } from "react";
import { CheckCircle, Loader2, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { SectionTitle } from "../components/ui/SectionTitle";
import { useSubmitContribution } from "../hooks/useResources";
import { useAllCourses } from "../hooks/useCourses";
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
    try {
      await mutation.mutateAsync({
        course_id: courseId,
        type: resourceType,
        title,
        description: description || undefined,
        url,
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
    } catch {
      /* handled by mutation state */
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12 text-center">
        <div className="rounded-2xl bg-green-50 p-4 w-fit mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Thank you!</h2>
        <p className="text-[#6B7280] mt-2">
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
      <SectionTitle subtitle="Help fellow students by sharing useful resources. Submissions are reviewed by the admin team before publishing.">
        Contribute
      </SectionTitle>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div ref={dropdownRef}>
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
            Select Course <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div
              className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 cursor-pointer flex items-center justify-between"
              onClick={() => setShowCourseDropdown(!showCourseDropdown)}
            >
              <span className={selectedCourse ? "text-[#1F2937]" : "text-[#6B7280]"}>
                {selectedCourse ? `${selectedCourse.course_code} — ${selectedCourse.course_name}` : "Select a course..."}
              </span>
            </div>

            {showCourseDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#EAECEF] bg-white shadow-lg z-10 max-h-64 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-[#EAECEF] sticky top-0 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#EAECEF] outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 text-sm"
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
                            : "text-[#1F2937] hover:bg-[#EAECEF]/50"
                        }`}
                      >
                        <p className="font-medium text-sm">{course.course_code}</p>
                        <p className="text-xs text-[#6B7280]">{course.course_name}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-[#6B7280] text-sm">No courses found</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-[#6B7280] mt-1">Search by course code or name</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Resource Type</label>
          <select value={resourceType} onChange={(e) => setResourceType(e.target.value as ResourceType)} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10">
            {resourceTypes.map((rt) => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Title</label>
          <Input placeholder="e.g. Introduction to Algorithms - MIT OCW" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Description (optional)</label>
          <textarea placeholder="Briefly describe what this resource covers..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border border-[#EAECEF] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] outline-none transition-all duration-150 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/10 resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">URL</label>
          <Input type="url" placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>

        <div className="border-t border-[#EAECEF] pt-5">
          <p className="text-sm font-medium text-[#1F2937] mb-3">Credits</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Author (optional)</label>
              <Input placeholder="Teacher or content creator name" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <p className="text-xs text-[#6B7280] mt-1">For playlists: teacher name. For notes: writer name. For books: author name.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Your Name (optional)</label>
              <Input placeholder="e.g. Rahim Uddin" value={contributorName} onChange={(e) => setContributorName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1.5">Your Contact URL (optional)</label>
              <Input placeholder="Facebook, LinkedIn, or any contact link" value={contributorUrl} onChange={(e) => setContributorUrl(e.target.value)} />
              <p className="text-xs text-[#6B7280] mt-1">Your name will appear in the contributors list with this link.</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={mutation.isPending || !courseId}>
          {mutation.isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
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
