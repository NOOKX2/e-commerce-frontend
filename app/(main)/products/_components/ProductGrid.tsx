import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types/product";

type ProductGridProps = {
    products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Products</h1>
                <p className="text-sm text-muted-foreground">Discover curated picks for your setup.</p>
            </div>
             
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {products.map((product) => (
                       
                        <ProductCard
                            key={product.ID}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            price={product.price}
                            slug={product.slug}
                            quantity={product.quantity}
                        />
                        
                    ))}
                </div>
       

        </section>

    )
}
