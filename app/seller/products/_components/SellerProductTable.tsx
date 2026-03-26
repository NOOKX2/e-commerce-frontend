import ProductTableAction from '@/app/seller/products/_components/ProductTableAction'
import { cn } from '@/lib/utils'
import { SellerProduct } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

interface SellerProductTableProps {
    products: SellerProduct[]
}

function SellerProductTable({ products }: SellerProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        <th scope="col" className="px-8 py-4">Product</th>
                        <th scope="col" className="px-8 py-4">Category</th>
                        <th scope="col" className="px-8 py-4">Price</th>
                        <th scope="col" className="px-8 py-4">Stock</th>
                        <th scope="col" className="px-8 py-4">Status</th>
                        <th scope="col" className="px-8 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {products.map((product) => (
                        <tr key={product.ID} className="transition-colors hover:bg-neutral-50/80">
                            <td className="whitespace-nowrap px-8 py-5">
                                <Link href={`/seller/products/${product.slug}`}>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                                            <Image
                                                className="h-10 w-10 object-cover"
                                                src={product.imageUrl || "/fallback-image.png"}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">{product.name}</div>
                                            <div className="text-sm text-neutral-500">{product.sku}</div>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className="whitespace-nowrap px-8 py-5 text-sm text-neutral-600">
                                {product.category?.name || "General"}
                            </td>
                            <td className="whitespace-nowrap px-8 py-5 text-sm font-medium tabular-nums text-slate-900">
                                ${product.price.toLocaleString()}
                            </td>
                            <td className="whitespace-nowrap px-8 py-5">
                                <div className={cn(
                                    "text-sm font-medium",
                                    product.quantity < 10 ? "text-red-600" : "text-neutral-700"
                                )}>
                                    {product.quantity} units
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-8 py-5">
                                <span className={cn(
                                    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                                    (product.status === "active" || !product.status) && "bg-green-100 text-green-800",
                                    product.status === "draft" && "bg-gray-100 text-gray-700",
                                    product.status === "inactive" && "bg-amber-100 text-amber-800",
                                    product.status === "archived" && "bg-red-100 text-red-800",
                                    product.status &&
                                        !["active", "draft", "inactive", "archived"].includes(product.status) &&
                                        "bg-neutral-100 text-neutral-800",
                                )}>
                                    {product.status || "active"}
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-8 py-5 text-right text-sm">
                                <ProductTableAction slug={product.slug} sku={product.sku} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SellerProductTable
