import { LucideIcon } from "lucide-react";

interface SellerStatCardProps {
    label: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

function SellerStatCard({ label, value, change, icon: Icon, color }: SellerStatCardProps) {
    return (
        <div key={label} className="bg-white overflow-hidden shadow-sm rounded-xl hover:shadow-md transition-shadow duration-200 border border-gray-100">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`shrink-0 rounded-lg p-3 ${color} bg-opacity-10`}>
                        <Icon className={`h-6 w-6 text-${color.replace('bg-', '')}`} aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                            <dd>
                                <div className="text-xl font-bold text-gray-900">{value}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
                <div className="text-xs font-medium text-green-600 truncate">
                    {change}
                </div>
            </div>
        </div>
    )
}

export default SellerStatCard
