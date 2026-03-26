import { LucideIcon } from "lucide-react";

export type StatAccent = "blue" | "indigo" | "purple" | "emerald";

const ACCENT: Record<
    StatAccent,
    { soft: string; icon: string; hint: string }
> = {
    blue: {
        soft: "bg-blue-500/10",
        icon: "text-blue-600",
        hint: "text-emerald-700/90",
    },
    indigo: {
        soft: "bg-indigo-500/10",
        icon: "text-indigo-600",
        hint: "text-emerald-700/90",
    },
    purple: {
        soft: "bg-purple-500/10",
        icon: "text-purple-600",
        hint: "text-emerald-700/90",
    },
    emerald: {
        soft: "bg-emerald-500/10",
        icon: "text-emerald-600",
        hint: "text-emerald-700/90",
    },
};

interface SellerStatCardProps {
    label: string;
    value: string;
    change: string;
    icon: LucideIcon;
    accent: StatAccent;
}

function SellerStatCard({
    label,
    value,
    change,
    icon: Icon,
    accent,
}: SellerStatCardProps) {
    const a = ACCENT[accent];
    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                    <div
                        className={`shrink-0 rounded-2xl p-3 ${a.soft}`}
                        aria-hidden
                    >
                        <Icon className={`h-6 w-6 ${a.icon}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                            {label}
                        </p>
                        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                            {value}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-50/90 px-5 py-3 sm:px-6">
                <p className={`truncate text-xs font-medium ${a.hint}`}>
                    {change}
                </p>
            </div>
        </div>
    );
}

export default SellerStatCard;
