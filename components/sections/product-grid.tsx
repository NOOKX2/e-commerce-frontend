import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types/api";

type ProductGridProps = {
    products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
    {console.log(products)}
    return (
        <section className="mr-30">
            <h1 className="text-4xl text-center font-bold">Ultimate E-Commerce Shop</h1>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            imageUrl={product.imageUrl}
                            name={product.name}
                            price={product.price}
                            slug={product.slug}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <p className="text-muted-foreground">No products found.</p>
                </div>

            )}

        </section>

    )
}
