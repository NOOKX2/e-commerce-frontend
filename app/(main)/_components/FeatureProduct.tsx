import { MOCK_PRODUCTS } from "@/lib/mock-data"; 
import  ProductCard  from "@/components/ui/product-card";

const featureProducts = MOCK_PRODUCTS.slice(0, 4)

function FeatureProduct() {
    return (
        <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Featured Products</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {featureProducts.map((product) => (
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
export default FeatureProduct