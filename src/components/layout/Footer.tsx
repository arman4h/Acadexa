import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[#EAECEF] bg-white mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="font-bold text-xl text-[#1F2937]">
              Nestora
            </Link>
            <p className="text-sm text-[#6B7280] mt-2 max-w-sm">
              An open-source educational resource archive helping students find learning materials for every course.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#1F2937] mb-3">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link to="/trimesters" className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                Trimesters
              </Link>
              <Link to="/search" className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                Search
              </Link>
              <Link to="/about" className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                About
              </Link>
            </div>
          </div>
            <div>
            <h4 className="font-semibold text-sm text-[#1F2937] mb-3">Community</h4>
            <div className="flex flex-col gap-2">
              <Link to="/contribute" className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                Contribute
              </Link>
              <Link to="/admin" className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150">
                Admin
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6B7280] hover:text-[#4F7CFF] transition-colors duration-150"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#EAECEF] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            &copy; {new Date().getFullYear()} Nestora. Open-source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
