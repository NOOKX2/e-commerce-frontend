import { ImageOff, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 

type ProductCardProps = {
    imageUrl: string | null | undefined;
    name: string;
    price: number;
    slug: string;
}

function ProductCard({imageUrl, name, price, slug}: ProductCardProps ) {
  return (
   <Link href={`/products/${slug}`} className="group">
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden">
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
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{name}</h3>
        <p className="text-muted-foreground mt-1">{`฿${price.toLocaleString()}`}</p>
      </div>
    </div>
   </Link>
  )
}
export default ProductCard