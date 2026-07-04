import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SEO } from "../components/SEO";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <SEO title="404 - Page Not Found" noindex />
      <h1 className="text-6xl font-bold text-[#1F2937] dark:text-slate-100">404</h1>
      <p className="mt-4 text-lg text-[#6B7280] dark:text-slate-400">
        Page not found.
      </p>
      <Link to="/" className="mt-6">
        <Button>
          <Home className="w-4 h-4" />
          Go home
        </Button>
      </Link>
    </div>
  );
}
