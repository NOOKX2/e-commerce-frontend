import { Filter } from "@/components/sections/filter";
import { ProductGrid } from "@/components/sections/product-grid";
import { ApiResponse, Product } from "@/types/api";


async function getFilterProducts(searchParams: { [key: string]: string | string[] | undefined }): Promise<Product[]> {
    
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
        if (typeof value === 'string') {
            params.set(key, value);
        } else if (Array.isArray(value)) {
            params.set(key, value.join(','));
        }
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/products?${params.toString()}`;
    console.log("Fetching from: ", apiUrl);

    try {
        const res = await fetch(apiUrl, { next: { revalidate: 0 } });
        if (!res.ok) {
            console.error("Failed to fetch products", await res.text());
            return [];
        }
        const response: ApiResponse<Product[]> = await res.json();
        console.log("fetch product successfully");
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
}

export default async function ProductPage({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
    const resolvedSearchParams = await searchParams;
    const products = await getFilterProducts(resolvedSearchParams);

    return (
        <div className="grid grid-cols-[250px_1fr] gap-5 my-10">
            <Filter />
            <ProductGrid products={products} />
        </div>
    );
}