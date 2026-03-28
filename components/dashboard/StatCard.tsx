import { LucideIcon } from "lucide-react";

export type StatAccent = "blue" | "indigo" | "purple" | "emerald" | "pink" | "green" | "orange";

const ACCENTS: Record<
    StatAccent,
    { soft: string; icon: string; hint: string }
> = {
    blue: {
        soft: "bg-blue-500/10",
        icon: "text-blue-600",
        hint: "text-blue-700/90",
    },
    indigo: {
        soft: "bg-indigo-500/10",
        icon: "text-indigo-600",
        hint: "text-indigo-700/90",
    },
    purple: {
        soft: "bg-purple-500/10",
        icon: "text-purple-600",
        hint: "text-purple-700/90",
    },
    emerald: {
        soft: "bg-emerald-500/10",
        icon: "text-emerald-600",
        hint: "text-emerald-700/90",
    },
    pink: {
        soft: "bg-pink-500/10",
        icon: "text-pink-600",
        hint: "text-pink-700/90",
    },
    green: {
        soft: "bg-emerald-500/10", // ใช้ emerald แทนถ้าไม่มีเขียวแยก
        icon: "text-emerald-600",
        hint: "text-emerald-700/90",
    },
    orange: {
        soft: "bg-orange-500/10",
        icon: "text-orange-600",
        hint: "text-orange-700/90",
    },
};

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string; // เปลี่ยนชื่อจาก change เป็น subtext เพื่อให้สื่อความหมายกว้างขึ้น
    icon: LucideIcon;
    accent: StatAccent;
}

export default function StatCard({
    label,
    value,
    subtext,
    icon: Icon,
    accent,
}: StatCardProps) {
    const a = ACCENTS[accent];

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-50">
            <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                    <div
                        className={`shrink-0 rounded-2xl p-3 ${a.soft}`}
                        aria-hidden
                    >
                        <Icon className={`h-6 w-6 ${a.icon}`} />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                        {label}
                    </p>

                </div>
                <p className="mt-1 text-2xl text-center font-bold tracking-tight text-slate-900">
                    {typeof value === "number" ? value.toLocaleString() : value}
                </p>
            </div>

            {/* ส่วนแถบด้านล่าง จะโชว์ก็ต่อเมื่อมี subtext ส่งมาเท่านั้น */}
            {subtext && (
                <div className="bg-neutral-50/90 px-5 py-3 sm:px-6 border-t border-slate-50">
                    <p className={`truncate text-xs font-bold ${a.hint}`}>
                        {subtext}
                    </p>
                </div>
            )}
        </div>
    );
}