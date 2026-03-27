import { LucideIcon } from "lucide-react";

export type StatAccent = "blue" | "indigo" | "purple" | "emerald" | "pink" | "green" | "orange";

const ACCENTS: Record<StatAccent, { bg: string; icon: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
  pink: { bg: "bg-pink-50", icon: "text-pink-600" },
  green: { bg: "bg-green-50", icon: "text-green-600" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600" },
};

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  accent: StatAccent;
}

export default function StatCard({ label, value, subtext, icon: Icon, accent }: StatCardProps) {
  const style = ACCENTS[accent];
  
  return (
    <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl ${style.bg} ${style.icon} shrink-0`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      {subtext && (
        <div className="bg-slate-50/80 px-6 py-3 border-t border-gray-50">
          <p className="text-xs font-semibold text-emerald-600 truncate">
            {subtext}
          </p>
        </div>
      )}
    </div>
  );
}