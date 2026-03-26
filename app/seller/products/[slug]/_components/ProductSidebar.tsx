import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Tag, Package } from "lucide-react";
import { Product } from "@/types/product";

export function ProductSidebar({ product }: { product: Product }) {
    return (
        <div className="space-y-6 lg:col-span-1">
            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8">
                    <CardTitle className="text-base font-semibold tracking-tight text-slate-900">Organization</CardTitle>
                </CardHeader>
                <CardContent className="px-8">
                    <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="flex items-center gap-2 text-neutral-500">
                            <Layers className="h-4 w-4 shrink-0 text-neutral-400" />
                            Category
                        </span>
                        <span className="font-medium text-slate-900 capitalize">
                            {product.category?.name || "General"}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                        <Tag className="h-4 w-4" /> Pricing
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-8">
                    <span className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                        ${product.price.toLocaleString()}
                    </span>
                </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                <CardHeader className="px-8 pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                        <Package className="h-4 w-4" /> Inventory
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-8">
                    <div className="text-3xl font-semibold tracking-tight text-slate-900">
                        {product.quantity} <span className="text-sm font-normal text-neutral-500">units</span>
                    </div>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                        SKU: {product.sku}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}