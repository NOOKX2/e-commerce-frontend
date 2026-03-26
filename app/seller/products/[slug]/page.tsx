import { 
    Edit3, Package, ArrowLeft, Tag, Layers
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return { title: `Product: ${slug}` };
}

export default async function SellerProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let product: Product | null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/products/${slug}`);
        
        if (res.ok) {
            const response: ApiResponse<Product> = await res.json();
            product = response.data;
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }

    if (!product) {
        return (
            <div className="py-20 text-center text-neutral-500">
                Product not found.
            </div>
        );
    }


    return (
        <div className="pb-16">
            <header className="sticky top-0 z-10 -mx-4 mb-8 bg-white/80 px-4 py-4 backdrop-blur-md shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seller/products">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold tracking-tight text-slate-900 capitalize">
                                {product.name}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/seller/products/${slug}/edit`}>
                            <Button className="rounded-2xl bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit product
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-0 sm:px-0 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card className="gap-0 overflow-hidden rounded-3xl border-0 bg-white p-0 py-0 shadow-sm">
                        <div className="relative aspect-video bg-neutral-100">
                            {product.imageUrl ? (
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 66vw, 100vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">
                                    No image available
                                </div>
                            )}
                        </div>
                        <CardContent className="p-8 sm:p-10">
                            <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">
                                Description
                            </h2>
                            <p className="text-sm leading-relaxed text-neutral-600">
                                {product.description || "No description provided."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Details Grid */}
                    
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:col-span-1">
                    <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                        <CardHeader className="px-8">
                            <CardTitle className="text-base font-semibold tracking-tight text-slate-900">
                                Organization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8">
                            <div className="flex items-center justify-between gap-4 text-sm">
                                <span className="flex items-center gap-2 text-neutral-500">
                                    <Layers className="h-4 w-4 shrink-0 text-neutral-400" />
                                    Category
                                </span>
                                <span className="font-medium text-slate-900">
                                    {product.category?.name || "General"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-0 bg-white py-8 shadow-sm">
                        <CardHeader className="px-8 pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                                <Tag className="h-4 w-4" />
                                Pricing
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
                                <Package className="h-4 w-4" />
                                Inventory
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8">
                            <div className="text-3xl font-semibold tracking-tight text-slate-900">
                                {product.quantity}{' '}
                                <span className="text-sm font-normal text-neutral-500">units</span>
                            </div>
                            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                                SKU: {product.sku}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}