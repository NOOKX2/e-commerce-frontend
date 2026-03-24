import { LucideIcon } from "lucide-react";
import SellerStatCard from "./SellerStatCard";

interface StatItem {
    label: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

interface SellerStatProps {
    stats: StatItem[]
}

function SellerStats({ stats }: SellerStatProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <SellerStatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    )
}

export default SellerStats
