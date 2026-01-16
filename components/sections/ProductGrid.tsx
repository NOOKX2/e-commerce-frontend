import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types/product";

type ProductGridProps = {
    products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <section className="mr-32">
            <h1 className="text-4xl text-center font-bold">Ultimate E-Commerce Shop</h1>
             
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
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
