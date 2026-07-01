import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-[#1F2937]">404</h1>
      <p className="mt-4 text-lg text-[#6B7280]">
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
