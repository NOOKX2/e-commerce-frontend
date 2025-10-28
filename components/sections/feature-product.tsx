import { MOCK_PRODUCTS } from "@/lib/mock-data"; 
import  ProductCard  from "@/components/ui/product-card";

const featureProducts = MOCK_PRODUCTS.slice(0, 4)

function FeatureProduct() {
    return (
        <section className="mx-40 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featureProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={product.price}
                        slug={product.slug}
                    />
                ))}
            </div>
        </section>
    )
}
export default FeatureProduct