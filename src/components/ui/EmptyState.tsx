import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or browse by semester.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-2xl bg-[#EAECEF]/50 p-4 mb-4">
        <Inbox className="w-8 h-8 text-[#6B7280]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1F2937]">{title}</h3>
      <p className="mt-1 text-sm text-[#6B7280] max-w-sm">{description}</p>
    </div>
  );
}
