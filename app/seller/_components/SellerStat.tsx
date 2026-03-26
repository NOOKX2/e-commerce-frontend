import { LucideIcon } from "lucide-react";
import SellerStatCard, { type StatAccent } from "./SellerStatCard";

interface StatItem {
    label: string;
    value: string;
    change: string;
    icon: LucideIcon;
    accent: StatAccent;
}

interface SellerStatProps {
    stats: StatItem[];
}

function SellerStats({ stats }: SellerStatProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {stats.map((stat) => (
                <SellerStatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    icon={stat.icon}
                    accent={stat.accent}
                />
            ))}
        </div>
    );
}

export default SellerStats;
