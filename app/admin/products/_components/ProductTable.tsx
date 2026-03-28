// @/components/dashboard/ProductTable.tsx
import { AdminProduct } from "@/types/product";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface ProductTableProps {
    products: AdminProduct[];
    role: 'admin' | 'seller';
    // เพิ่ม onStatusChange เพื่อให้ Table จัดการการเปลี่ยนค่าได้เองถ้าไม่ได้ส่ง renderStatus มา
    onStatusChange?: (id: number, status: string) => void; 
    renderStatus?: (product: AdminProduct) => React.ReactNode;
    renderActions?: (product: AdminProduct) => React.ReactNode;
}

const statusOptions = ["active", "pending", "inactive", "draft", "archived"];

export default function ProductTable({ 
    products, 
    role, 
    onStatusChange,
    renderStatus, 
    renderActions 
}: ProductTableProps) {
    const isAdmin = role === 'admin';

    console.log('product in product table',products);

    return (
        <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 bg-slate-50/30">
                        <th className="px-8 py-5">Product</th>
                        {isAdmin && <th className="px-8 py-5">Seller</th>}
                        <th className="px-8 py-5">Category</th>
                        <th className="px-8 py-5">Price</th>
                        <th className="px-8 py-5 text-center">Stock</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {products.map((product) => (
                        <tr key={product.ID} className="transition-colors hover:bg-slate-50/50 group">
                            {/* Product Info */}
                            <td className="whitespace-nowrap px-8 py-5">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                                        <Image 
                                            src={product.imageUrl || "/fallback.png"} 
                                            alt={product.name} 
                                            width={40} 
                                            height={40} 
                                            className="object-cover h-full w-full" 
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-bold text-slate-900">{product.name}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-tighter font-mono">ID: {product.ID}</div>
                                    </div>
                                </div>
                            </td>

                            {isAdmin && (
                                <td className="px-8 py-5 text-sm font-semibold text-blue-600">
                                    <span className="bg-blue-50 px-2 py-1 rounded-lg">
                                        {product.seller?.name || `Seller #${product.sellerId}`}
                                    </span>
                                </td>
                            )}

                            <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                                {product.category?.name || "-"}
                            </td>
                            
                            <td className="px-8 py-5 text-sm font-black text-slate-900 tabular-nums">
                                ฿{product.price?.toLocaleString()}
                            </td>
                            
                            <td className="px-8 py-5 text-center text-sm font-bold text-slate-600">
                                {product.quantity}
                            </td>

                            {/* Status Column: ใช้ renderStatus ถ้าส่งมา ถ้าไม่ส่งมาจะโชว์ Select พื้นฐาน */}
                            <td className="px-8 py-5 text-center">
                                <div className="flex justify-center">
                                    {renderStatus ? renderStatus(product) : (
                                        <Select 
                                            value={product.status} 
                                            onValueChange={(val) => onStatusChange?.(product.ID, val)}
                                        >
                                            <SelectTrigger className="w-32 h-8 rounded-xl text-[11px] font-bold uppercase border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((s) => (
                                                    <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                            </td>

                            {/* Actions Column */}
                            <td className="px-8 py-5 text-right">
                                {renderActions ? renderActions(product) : (
                                    <Link href={`/admin/products/${product.slug}`}>
                                    <button className="font-bold text-blue-600 hover:underline text-[11px] uppercase tracking-wider">
                                        Details
                                    </button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}