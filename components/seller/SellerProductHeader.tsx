import { Filter, PlusCircle, Search } from 'lucide-react'

interface SellerProductHeaderProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

function SellerProductHeader({searchQuery, setSearchQuery}: SellerProductHeaderProps) {
  return (
     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex items-center justify-center px-4 py-2.5 border border-gray-200 text-gray-700 bg-white rounded-xl hover:bg-gray-50 font-medium transition-colors flex-1 sm:flex-none">
                        <Filter className="h-5 w-5 mr-2" />
                        Filter
                    </button>
                    <button className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-sm shadow-blue-200 transition-all flex-1 sm:flex-none">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Add Product
                    </button>
                </div>
            </div>
  )
}

export default SellerProductHeader
