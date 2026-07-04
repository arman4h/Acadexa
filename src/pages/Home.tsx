import { Link, useNavigate } from "react-router-dom";
import {
  Search, ArrowUpRight,
  GitFork, Heart, Star, GraduationCap,
  BookOpen, Layers, PlusCircle, FolderOpen, Globe, Award, ExternalLink,
} from "lucide-react";
import { TrimesterCard } from "../components/ui/TrimesterCard";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { Button } from "../components/ui/Button";
import { useTrimesters } from "../hooks/useTrimesters";
import { useAllResources } from "../hooks/useResources";
import { resourceTypes, getResourceIcon } from "../utils/resourceHelpers";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect } from "react";

const totalTrimesters = 12;

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: trimesters, isLoading: trimestersLoading } = useTrimesters();
  const { data: allResources } = useAllResources();

  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, navigate]);

  const totalCourses = trimesters?.reduce(
    (sum, t) => sum + (t.course_count ?? 0), 0
  ) ?? 0;

  const totalResources = allResources?.length ?? 0;

  const previewTrimesters = trimesters?.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <span className="eyebrow">
          <Star className="w-3.5 h-3.5" />
          Open Source Resource Hub for UIU CSE
        </span>
        <h1>Your CSE Study Companion at UIU</h1>
        <p className="hero-subtitle">
          Browse playlists, notes, question banks and study resources for every
          CSE course — no more scrolling through a shared spreadsheet.
        </p>
        <p className="hero-note">
          Built by CSE students, for CSE students at United International
          University.
        </p>

        <div className="hero-search" role="search">
          <Search className="w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Search course code, name or faculty…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search courses"
          />
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-num">{totalCourses}</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{totalTrimesters}</div>
            <div className="stat-label">Trimesters</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{totalResources}</div>
            <div className="stat-label">Resources</div>
          </div>
        </div>
      </section>

      {/* Resource Types Shelf */}
      <section className="shelf-section" aria-label="Resource types">
        <p className="shelf-label">
          Every course, organized across the resources that actually help
        </p>
        <div className="shelf-track-outer">
          <div className="shelf-track">
            {[...resourceTypes, ...resourceTypes].map((type, i) => {
              const Icon = getResourceIcon(type.value);
              return (
                <span key={i} className="shelf-pill">
                  <Icon className="w-3.5 h-3.5" />
                  {type.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] dark:text-slate-100">
            Everything you need, one place
          </h2>
          <p className="mt-2 text-[#6B7280] dark:text-slate-400 max-w-2xl mx-auto">
            No more digging through scattered Google Sheets or group chats.
            Acadex keeps it all organized.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Layers,
              title: "Trimester-Based Sorting",
              desc: "Resources organized by trimester so you can find exactly what you need for your current courses.",
            },
            {
              icon: Search,
              title: "Quick Course Search",
              desc: "Search by course code, course name, or faculty — instantly find the materials you're looking for.",
            },
            {
              icon: BookOpen,
              title: "Individual Course Pages",
              desc: "Every course gets its own dedicated page with all linked resources neatly categorized.",
            },
            {
              icon: FolderOpen,
              title: "All Resource Types",
              desc: "YouTube playlists, notes, question banks, GitHub repos, books, PDFs, and more — all in one spot.",
            },
            {
              icon: PlusCircle,
              title: "Contribute Resources",
              desc: "Know a great resource? Submit it through our contribution form and help your fellow students.",
            },
            {
              icon: Globe,
              title: "Open Source & Free",
              desc: "Built by CSE students, for CSE students. Fully open-source under the MIT License.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md hover:border-[#4F7CFF]/30 transition-all duration-200"
            >
              <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mb-4">
                <feature.icon className="w-5 h-5 text-[#4F7CFF]" />
              </div>
              <h3 className="font-semibold text-[#1F2937] dark:text-slate-100 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trimesters Preview */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1F2937] dark:text-slate-100">
            Trimesters
          </h2>
          <p className="mt-1 text-[#6B7280] dark:text-slate-400">
            Explore resources organized by trimester.
          </p>
        </div>
        {trimestersLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <SkeletonLoader count={6} height="h-28" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {previewTrimesters.map((trimester) => (
              <TrimesterCard key={trimester.id} trimester={trimester} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-6">
          <Link
            to="/trimesters"
            className="inline-flex items-center gap-2 rounded-xl bg-[#4F7CFF] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#3B66E0] transition-all duration-150 shadow-sm"
          >
            View All Trimesters
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Open Source */}
      <section className="bg-white dark:bg-slate-950 border-t border-[#EAECEF] dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#4F7CFF]/10 px-4 py-1.5 text-sm font-medium text-[#4F7CFF] mb-4">
              <GraduationCap className="w-4 h-4" />
              Open Source & Community Driven
            </div>
            <h2 className="text-3xl font-bold text-[#1F2937] dark:text-slate-100">
              Built by students, for students
            </h2>
            <p className="mt-2 text-[#6B7280] dark:text-slate-400 max-w-2xl mx-auto">
              Acadex is an open-source project. Anyone can contribute resources
              and help fellow students succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-[#FAFBFD] dark:bg-slate-900 p-8">
              <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mb-4">
                <GitFork className="w-6 h-6 text-[#4F7CFF]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] dark:text-slate-100 mb-3">
                How It Works
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Browse Trimesters",
                    desc: "Find your trimester and course.",
                  },
                  {
                    step: "2",
                    title: "Discover Resources",
                    desc: "Access playlists, notes, question banks, and more.",
                  },
                  {
                    step: "3",
                    title: "Study & Succeed",
                    desc: "Use community-shared materials to excel.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4F7CFF]/10 text-[#4F7CFF] text-sm font-semibold shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-medium text-[#1F2937] dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#6B7280] dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#EAECEF] dark:border-slate-800 bg-[#FAFBFD] dark:bg-slate-900 p-8">
              <div className="rounded-xl bg-[#4F7CFF]/10 p-3 w-fit mb-4">
                <Heart className="w-6 h-6 text-[#4F7CFF]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1F2937] dark:text-slate-100 mb-3">
                How to Contribute
              </h3>
              <ul className="space-y-4 mb-6">
                {[
                  {
                    step: "1",
                    title: "Submit a Resource",
                    desc: "Fill out the contribution form with a link to your resource.",
                  },
                  {
                    step: "2",
                    title: "Get Reviewed",
                    desc: "The team reviews and approves your submission.",
                  },
                  {
                    step: "3",
                    title: "Help Others",
                    desc: "Your contribution helps fellow students learn better.",
                  },
                ].map((item) => (
                  <li key={item.step} className="flex gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4F7CFF]/10 text-[#4F7CFF] text-sm font-semibold shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-medium text-[#1F2937] dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#6B7280] dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => navigate("/contribute")}>
                  <Heart className="w-4 h-4" />
                  Contribute Now
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      "https://github.com/arman4h/Acadexa",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <GitFork className="w-4 h-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honorable Mentions */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#4F7CFF]/10 px-4 py-1.5 text-sm font-medium text-[#4F7CFF] mb-4">
            <Award className="w-4 h-4" />
            Honorable Mentions
          </div>
          <h2 className="text-3xl font-bold text-[#1F2937] dark:text-slate-100">
            Standing on the shoulders of pioneers
          </h2>
          <p className="mt-2 text-[#6B7280] dark:text-slate-400 max-w-2xl mx-auto">
            A special thank you to the people and teams whose earlier work made
            Acadex possible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
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
                href="https://www.facebook.com/groups/uiuss"
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
      </section>
    </div>
  );
}
