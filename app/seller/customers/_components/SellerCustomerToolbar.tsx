import { Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ToolbarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

function SellerCustomerToolbar({ searchTerm, setSearchTerm }: ToolbarProps) {
    return (
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="relative w-full sm:max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full rounded-2xl bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-inner outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-blue-500/25"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Button
                type="button"
                variant="secondary"
                className="h-10 w-full shrink-0 rounded-2xl bg-neutral-100 font-medium text-slate-900 shadow-none hover:bg-neutral-200/80 sm:w-auto"
            >
                <Filter className="mr-2 h-4 w-4" />
                Filter
            </Button>
        </div>
    )
}

export default SellerCustomerToolbar
