import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface customerProfileHeaderProps {
    id: number;
    name: string;
    status: string;
}

export default function CustomerProfileHeader({
    id,
    name,
    status,
}: customerProfileHeaderProps) {
    return (
        <div className="flex flex-col gap-6">
            <Button
                variant="ghost"
                className="h-9 w-fit rounded-full px-0 font-medium text-neutral-600 hover:text-slate-900"
                asChild
            >
                <Link href="/seller/customers" className="inline-flex items-center gap-1.5">
                    <ArrowLeft className="h-4 w-4" />
                    Customers
                </Link>
            </Button>
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-200/90 text-2xl font-semibold text-slate-800 shadow-sm">
                    {name ? name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                            {name}
                        </h1>
                        <span
                            className={cn(
                                'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-700'
                            )}
                        >
                            {status}
                        </span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">
                        Customer ID: #{id}
                    </p>
                </div>
            </div>
        </div>
    );
}
