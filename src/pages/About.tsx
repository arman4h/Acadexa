import { FolderGit, Heart, Award, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionTitle } from "../components/ui/SectionTitle";

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <SectionTitle subtitle="An open-source educational resource archive for university students.">
        About Acadex
      </SectionTitle>

      <div className="space-y-6 text-[#6B7280] dark:text-slate-400 leading-relaxed">
        <p>
          Acadex helps university students easily find learning materials for
          every course. Instead of digging through large Google Sheets or
          scattered links, Acadex organizes everything in one clean, searchable
          place.
        </p>
        <p>
          We do not host content. We organize links to YouTube playlists, Google
          Drive folders, question banks, GitHub repositories, notes, books,
          PDFs, and external websites.
        </p>
        <p>
          Acadex is open-source and community-driven. Anyone can contribute by
          submitting resources through the contribute form.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="rounded-xl bg-[#EAECEF]/50 dark:bg-slate-800 p-2.5 w-fit mb-3">
            <FolderGit className="w-5 h-5 text-[#1F2937] dark:text-slate-100" />
          </div>
          <h3 className="font-semibold text-[#1F2937] dark:text-slate-100">
            Open Source
          </h3>
          <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-1">
            Acadex is open-source under the MIT License. Contribute on GitHub.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => window.open("https://github.com/arman4h/Acadexa", "_blank")}
          >
            <FolderGit className="w-4 h-4" />
            GitHub Repository
          </Button>
        </div>
        <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <div className="rounded-xl bg-[#EAECEF]/50 dark:bg-slate-800 p-2.5 w-fit mb-3">
            <Heart className="w-5 h-5 text-[#1F2937] dark:text-slate-100" />
          </div>
          <h3 className="font-semibold text-[#1F2937] dark:text-slate-100">
            Community Driven
          </h3>
          <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-1">
            Resources are submitted by students, for students.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => (window.location.href = "/contribute")}
          >
            Contribute
          </Button>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-2.5 mb-6">
          <Award className="w-5 h-5 text-[#4F7CFF]" />
          <h2 className="text-xl font-bold text-[#1F2937] dark:text-slate-100">
            Honorable Mentions
          </h2>
        </div>
        <p className="text-sm text-[#6B7280] dark:text-slate-400 mb-6 leading-relaxed">
          Acadex stands on the shoulders of those who came before us. A special
          thank you to the people and teams whose earlier work made this project
          possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Tashin Parvez */}
          <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-48 bg-[#EAECEF]/50 dark:bg-slate-800 flex items-center justify-center">
              <img
                src="https://avatars.githubusercontent.com/u/84122972?v=4"
                alt="Md. Tashin Parvez"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="text-[#6B7280] dark:text-slate-500 text-sm">Photo coming soon</span>';
                }}
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[#1F2937] dark:text-slate-100">
                Md. Tashin Parvez
              </h3>
              <p className="text-xs text-[#4F7CFF] font-medium mb-2">
                Student ID: 011 221 437
              </p>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">
                Former UIU CSE student whose resource database, created in
                Summer 2023, formed the foundation of Acadex. Most of the
                initial course and resource data was sourced from his meticulous
                work.
              </p>
              <a
                href="https://github.com/TashinParvez"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-[#4F7CFF] hover:text-[#3B66E0] transition-colors duration-150"
              >
                Visit Github
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Team UIUSS */}
          <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-48 bg-[#EAECEF]/50 dark:bg-slate-800 flex items-center justify-center">
              <img
                src="https://i.ibb.co.com/dsCkRqn1/UIUSS.png"
                alt="Team UIUSS"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="text-[#6B7280] dark:text-slate-500 text-sm">Photo coming soon</span>';
                }}
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[#1F2937] dark:text-slate-100">
                Team UIUSS
              </h3>
              <p className="text-xs text-[#4F7CFF] font-medium mb-2">
                UIU Scholar's Squad
              </p>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">
                UIU Scholar's Squad also contributed significantly to building
                and organizing CSE course resources. Their collected data has
                been a valuable addition to the Acadex resource archive.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-[#4F7CFF] hover:text-[#3B66E0] transition-colors duration-150"
              >
                Visit Facebook Group
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
