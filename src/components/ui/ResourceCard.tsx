import { ExternalLink } from "lucide-react";
import type { Resource } from "../../types";
import { getResourceIcon, getResourceTypeLabel } from "../../utils/resourceHelpers";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = getResourceIcon(resource.type);

  return (
    <div className="rounded-2xl border border-[#EAECEF] bg-white p-5 transition-all duration-150 hover:shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-[#4F7CFF]/10 p-2.5 shrink-0">
          <Icon className="w-5 h-5 text-[#4F7CFF]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-[#1F2937] truncate">
                {resource.title}
              </h4>
              <Badge variant="primary" >
                {getResourceTypeLabel(resource.type)}
              </Badge>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(resource.url, "_blank", "noopener,noreferrer")}
              className="shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </Button>
          </div>
          {resource.description && (
            <p className="text-sm text-[#6B7280] mt-2 line-clamp-2">
              {resource.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
