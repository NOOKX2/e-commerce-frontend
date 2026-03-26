import { ImageOff} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

type ProductCardProps = {
    imageUrl: string | null | undefined;
    name: string;
    price: number;
    slug: string;
    quantity: number;
}

function ProductCard({imageUrl, name, price, slug, quantity}: ProductCardProps ) {
  const isOutOfStock = quantity <= 0;
  return (
   <Link href={`/products/${slug}`} className="group block">
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f7]">
        {imageUrl ? (
             <Image 
        src={imageUrl}
        alt={name}
        fill
        className="object-cover transition-transform group-hover:scale-105"
        />
        ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImageOff className="h-16 w-16" /> 
            </div>
        )}
     
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-1 text-base font-semibold md:text-lg">{name}</h3>
        <p className="text-sm font-medium text-neutral-700">{`฿${price.toLocaleString()}`}</p>
        {isOutOfStock && (
          <p className="pt-0.5 text-xs font-medium text-red-500">Out of stock</p>
        )}
      </div>
    </div>
   </Link>
  )
}
export default ProductCard