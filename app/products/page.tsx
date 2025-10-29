import { Filter } from "@/components/sections/filter"
import {ProductGrid} from "@/components/sections/product-grid"
import { ApiResponse, Product } from "@/types/api";


  async function getFilterProducts(searchParams: {[key: string]: string | string[] | undefined}): Promise<Product[]> {
        const searchParamsWithoutSymbol: {[key: string]: string} = {}
        for (const[key, value] of Object.entries(searchParams)) {
            if (typeof value === 'string') {
                searchParamsWithoutSymbol[key] = value;
            }else if (Array.isArray(value)) {
                searchParamsWithoutSymbol[key] = value.join(',');
            }
        }

        const params = new URLSearchParams(searchParamsWithoutSymbol);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/products?${params.toString()}`;
        console.log("Fetching from: ", apiUrl);

        try {
            const res = await fetch(apiUrl, {cache: 'no-store'})

            if (!res.ok) {
                console.error("Failed to fetch products", await res.text());
                throw new Error("Failed to fetch products");
            }

            const response: ApiResponse<Product[]> = await res.json();
            console.log("fetch product successfully")
            return response.data
        } catch(error) {
            console.error("Error fetching products", error)
            return [];
        }
    }

async function ProductPage({searchParams} :{searchParams: {[key: string]: string | string[] | undefined}}) {
  const resolvedSearchParams = await searchParams  
  const products = await getFilterProducts(resolvedSearchParams)
  return (
    <div className="grid grid-cols-[250px_1fr] gap-5 my-10">
        <Filter />
        <ProductGrid products={products}/>
    </div>
  )
}
export default ProductPage