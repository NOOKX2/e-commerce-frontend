import { Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { ProductHeroCard } from "./_components/ProductHeroCard";
import { ProductSidebar } from "./_components/ProductSidebar";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return { title: `Product: ${slug}` };
}

export default async function SellerProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let product: Product | null = null;
    try {
        // แนะนำให้ใส่ cache: 'no-store' ถ้าต้องการให้หน้านี้อัปเดตข้อมูลล่าสุดเสมอ
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/products/${slug}`, { cache: 'no-store' });
        
        if (res.ok) {
            const response: ApiResponse<Product> = await res.json();
            product = response.data;
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }

    if (!product) {
        return <div className="py-20 text-center text-neutral-500">Product not found.</div>;
    }

    return (
        <div className="pb-16">
            {/* Header */}
            <header className="sticky top-0 z-10 -mx-4 mb-8 bg-white/80 px-4 py-4 backdrop-blur-md shadow-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/seller/products">
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-semibold tracking-tight text-slate-900 capitalize">
                            {product.name}
                        </h1>
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

            {/* Grid Layout ที่อ่านง่ายเหมือนสารบัญ */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-0 sm:px-0 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <ProductHeroCard product={product} />
                </div>
                
                <ProductSidebar product={product} />
            </div>
        </div>
    );
}