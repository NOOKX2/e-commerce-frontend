import { Calendar } from 'lucide-react';

interface Props {
    totalOrders: number;
    totalSpent: number;
    joinedDate: string;
}

export default function CustomerStatsCard({ totalOrders, totalSpent, joinedDate }: Props) {
    const formatCompactNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: "compact",
            maximumFractionDigits: 2
        }).format(number);
    };

    const formatFullNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(number);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lifetime Summary</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase mt-1">Total Orders</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center flex flex-col justify-center">
                    <div className="relative group inline-block mx-auto cursor-help pb-1">
                        <div className="text-2xl font-bold text-blue-600" >
                            {formatCompactNumber(totalSpent)}
                        </div>
                        <div className="absolute bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            {/* กล่องสีดำพร้อมเงา */}
                            <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                                {formatFullNumber(totalSpent)}
                            </div>
                            {/* สามเหลี่ยมเล็กๆ ชี้ลงด้านล่าง */}
                            <div className="w-3 h-3 bg-gray-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase mt-1">Total Spent</div>
                </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 justify-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                First order placed on {joinedDate || "-"}
            </div>
        </div>
    );
}