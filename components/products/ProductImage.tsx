import { Product } from "@/types/api";
import { Package } from "lucide-react";
import Image from "next/image";

type ProductImageProps = {
    product: Product;
}

function ProductImage({ product }: ProductImageProps) {
    return (
        <div className='w-full md:2/5'>
            <div className='relative aspect-square rounded-lg overflow-hidden bg-mutted'>
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
