import { Calendar } from 'lucide-react';

interface Props {
    totalOrders: number;
    totalSpent: number;
    joinedDate: string;
}

export default function CustomerStatsCard({
    totalOrders,
    totalSpent,
    joinedDate,
}: Props) {
    const formatCompactNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 2,
        }).format(number);
    };

    const formatFullNumber = (number: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(number);
    };

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-9">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Lifetime summary
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-neutral-50 px-4 py-5 text-center">
                    <div className="text-2xl font-semibold tracking-tight text-slate-900">
                        {totalOrders}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Orders
                    </div>
                </div>
                <div className="rounded-2xl bg-neutral-50 px-4 py-5 text-center">
                    <div className="relative group inline-block cursor-help">
                        <div className="text-2xl font-semibold tracking-tight text-slate-900">
                            {formatCompactNumber(totalSpent)}
                        </div>
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-medium text-white shadow-lg whitespace-nowrap">
                                {formatFullNumber(totalSpent)}
                            </div>
                        </div>
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">
                        Spent
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center text-xs text-neutral-500">
                <Calendar className="mr-1.5 h-4 w-4" />
                First order {joinedDate || '—'}
            </div>
        </div>
    );
}
