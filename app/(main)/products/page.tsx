import Pagination from "@/components/products/Pagination";
import { Filter } from "@/components/sections/Filter";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Product } from "@/types/product";

export interface PaginationMeta {
    total_pages: number;
    current_page: number;
    total_items?: number;
}

export interface ProductResponse {
    products: Product[];
    meta: PaginationMeta;
}

async function getFilterProducts(searchParams: { [key: string]: string | string[] | undefined }): Promise<{ products: Product[]; meta: PaginationMeta }> {

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
            throw new Error('Failed to fetch');
        }
        const response = await res.json();
        console.log("fetch product successfully");
        console.log(response);
        return {
            products: response.data || [],
            meta: {
                total_pages: response.meta?.total_pages || 0,
                current_page: Number(params.get('page')) || 1, // ดึงจาก params ถ้า API ไม่ส่งมา
                total_items: response.meta?.total_items
            }
        };
    } catch (error) {
        console.error("Error fetching products", error);
        return {
            products: [],
            meta: { total_pages: 0, current_page: 1 }
        };
    }
}

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedSearchParams = await searchParams;

    const { products, meta } = await getFilterProducts(resolvedSearchParams);

    return (
        <div className="grid grid-cols-[250px_1fr] items-start gap-8 my-10">
            <aside className="sticky top-24 w-[250px]">
                <Filter />
            </aside>
            <main className="flex flex-col gap-8">
                {products.length > 0 ? (

                    <>
                        <ProductGrid products={products} />
                        {meta.total_pages > 1 && (
                            <div className="py-10 border-t">
                                <Pagination meta={meta} />
                            </div>
                        )}
                    </>
                ) : (

                    <div className="flex flex-col sm:w-15 md:w-100  lg:w-250">
                        <p className="text-center mr-50 ">No Product Found</p>
                    </div>
                )}
            </main>
        </div>
    );
}