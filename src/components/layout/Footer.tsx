import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#EAECEF] dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[#1F2937] dark:text-slate-100">
              <img src="/logo.svg" alt="Acadex" className="h-7 w-7" />
              Acadex
            </Link>
            <p className="text-sm text-[#6B7280] dark:text-slate-400 mt-2 max-w-sm">
              An open-source educational resource archive helping students find learning materials for every course.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#1F2937] dark:text-slate-100 mb-3">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link to="/trimesters" className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150">
                Trimesters
              </Link>
              <Link to="/search" className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150">
                Search
              </Link>
              <Link to="/about" className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150">
                About
              </Link>
            </div>
          </div>
            <div>
            <h4 className="font-semibold text-sm text-[#1F2937] dark:text-slate-100 mb-3">Community</h4>
            <div className="flex flex-col gap-2">
              <Link to="/contribute" className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150">
                Contribute
              </Link>
              <Link to="/nimda" className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150">
                Admin
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6B7280] dark:text-slate-400 hover:text-[#4F7CFF] transition-colors duration-150"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#EAECEF] dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] dark:text-slate-400">
            &copy; {new Date().getFullYear()} Acadex. Open-source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
