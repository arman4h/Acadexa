import type { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  children?: ReactNode;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-[#EAECEF] dark:border-slate-800 overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 -mb-px cursor-pointer ${
            activeTab === tab.id
              ? "border-[#4F7CFF] text-[#4F7CFF]"
              : "border-transparent text-[#6B7280] hover:text-[#1F2937] dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
