import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";

export function ProductHeroCard({ product }: { product: Product }) {
    return (
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
                <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-wrap">
                    {product.description || "No description provided."}
                </p>
            </CardContent>
        </Card>
    );
}