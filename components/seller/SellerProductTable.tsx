import { cn } from '@/lib/utils'
import { SellerProduct } from '@/types/product'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
interface SellerProductTableProps {
    products: SellerProduct[]
}

function SellerProductTable({ products }: SellerProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.ID} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={`/seller/products/${product.slug}`} >
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 shrink-0">
                                            <Image className="h-10 w-10 rounded-lg object-cover border border-gray-200" src={product.imageUrl || "/fallback-image.png"} alt={product.name} width={40} height={40} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.sku}</div>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{product.category?.name || "General"}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">${product.price.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className={cn(
                                    "text-sm font-medium",
                                    product.quantity < 10 ? "text-red-600" : "text-gray-900"
                                )}>
                                    {product.quantity} units
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={cn(
                                    "px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize",
                                    
                                    product.status === "active" && "bg-green-100 text-green-800",
                                    product.status === "draft" && "bg-gray-100 text-gray-800",
                                    product.status === "inactive" && "bg-yellow-100 text-yellow-800",
                                    product.status === "archived" && "bg-red-100 text-red-800",
                                )}>
                                    {product.status || "active"}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/seller/products/${product.slug}/edit`}>
                                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SellerProductTable
