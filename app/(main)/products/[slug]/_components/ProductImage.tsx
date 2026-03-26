import { Product } from "@/types/product";
import { Package } from "lucide-react";
import Image from "next/image";

type ProductImageProps = {
    product: Product;
}

function ProductImage({ product }: ProductImageProps) {
    return (
        <div className='w-full'>
            <div className='relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f7]'>
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className='object-cover'
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Package className="h-24 w-24" />
                    </div>

                )}
            </div>
        </div>
    )
}

export default ProductImage
