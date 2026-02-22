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
        return <div className="p-20 text-center text-gray-500">Product not found.</div>;
    }

    console.log("product detail page", product);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <header className="bg-white border-b px-6 py-4 mb-8 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seller/products">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900 capitalize">
                                {product.name} {/* นำชื่อสินค้ามาใช้ */}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/seller/products/${slug}/edit`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Product
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Media Card */}
                    <Card className="overflow-hidden border-none shadow-sm">
                        <div className="aspect-video bg-gray-100 relative group">
                            {product.imageUrl ? (
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic">
                                    No image available
                                </div>
                            )}
                        </div>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || "No description provided."} {/* นำคำบรรยายมาใช้ */}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Details Grid */}
                    
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-500 flex items-center gap-2"><Layers className="w-4 h-4" /> Category</span>
                                <span className="text-sm font-medium text-gray-900">{product.category?.name || "General"}</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <Tag className="w-4 h-4" /> Pricing Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${product.price.toLocaleString()} {/* นำราคามาใช้ */}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                    <Package className="w-4 h-4" /> Inventory Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">
                                    {product.quantity} <span className="text-sm font-normal text-gray-500">Units</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 uppercase">SKU: {product.sku}</p>
                            </CardContent>
                        </Card>
                   
                </div>
            </div>
        </div>
    );
}