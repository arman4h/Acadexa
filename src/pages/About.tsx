import { FolderGit, Heart } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionTitle } from "../components/ui/SectionTitle";

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <SectionTitle subtitle="An open-source educational resource archive for university students.">
        About Nestora
      </SectionTitle>

      <div className="space-y-6 text-[#6B7280] leading-relaxed">
        <p>
          Nestora helps university students easily find learning materials for every course.
          Instead of digging through large Google Sheets or scattered links, Nestora organizes
          everything in one clean, searchable place.
        </p>
        <p>
          We do not host content. We organize links to YouTube playlists, Google Drive folders,
          question banks, GitHub repositories, notes, books, PDFs, and external websites.
        </p>
        <p>
          Nestora is open-source and community-driven. Anyone can contribute by submitting
          resources through the contribute form.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
          <div className="rounded-xl bg-[#EAECEF]/50 p-2.5 w-fit mb-3">
            <FolderGit className="w-5 h-5 text-[#1F2937]" />
          </div>
          <h3 className="font-semibold text-[#1F2937]">Open Source</h3>
          <p className="text-sm text-[#6B7280] mt-1">
            Nestora is open-source under the MIT License. Contribute on GitHub.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <FolderGit className="w-4 h-4" />
            GitHub Repository
          </Button>
        </div>
        <div className="rounded-2xl border border-[#EAECEF] bg-white p-5">
          <div className="rounded-xl bg-[#EAECEF]/50 p-2.5 w-fit mb-3">
            <Heart className="w-5 h-5 text-[#1F2937]" />
          </div>
          <h3 className="font-semibold text-[#1F2937]">Community Driven</h3>
          <p className="text-sm text-[#6B7280] mt-1">
            Resources are submitted by students, for students.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => window.location.href = "/contribute"}
          >
            Contribute
          </Button>
        </div>
      </div>
    </div>
  );
}
