import { Filter, Search } from 'lucide-react'

interface ToolbarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

function SellerCustomerToolbar({searchTerm, setSearchTerm}: ToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-700 bg-white rounded-xl hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto shadow-sm">
                <Filter className="h-5 w-5 mr-2" />
                Filter
            </button>
        </div>
    )
}

export default SellerCustomerToolbar
