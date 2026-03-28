import type { ReactNode } from "react";
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
import { cn } from "@/lib/utils";

interface ProductTableProps {
  products: AdminProduct[];
  role: "admin" | "seller";
  /** Per product ID: when true, status Select uses dirty (blue) styling */
  dirty?: Record<number, boolean>;
  onStatusChange?: (id: number, status: string) => void;
  renderStatus?: (product: AdminProduct) => ReactNode;
  renderActions?: (product: AdminProduct) => ReactNode;
  footer?: ReactNode;
}

const statusOptions = ["active", "pending", "inactive", "draft", "archived"];

export default function ProductTable({
  products,
  role,
  dirty,
  onStatusChange,
  renderStatus,
  renderActions,
  footer,
}: ProductTableProps) {
  const isAdmin = role === "admin";

  return (
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
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
                    {products.map((product) => {
                            const statusDirty =
                              isAdmin && (dirty?.[product.ID] ?? false);

                            return (
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
                            
                            <td className="px-8 py-5 text-sm font-semibold text-slate-900 tabular-nums">
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
                                            <SelectTrigger
                                              className={cn(
                                                "w-32 h-8 rounded-xl text-[11px] font-bold uppercase border-slate-200 bg-white text-slate-800",
                                                "focus:ring-2 focus:ring-slate-200/80 focus:border-slate-300",
                                                "[&_svg]:opacity-50",
                                                statusDirty &&
                                                  "border-blue-500 bg-blue-50/90 text-blue-800 shadow-sm ring-2 ring-blue-500/20 focus:border-blue-500 focus:ring-blue-500/25 [&_svg]:text-blue-600 [&_svg]:opacity-100"
                                              )}
                                            >
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
                            );
                    })}
                </tbody>
            </table>
        </div>
        {footer}
        </div>
    );
}