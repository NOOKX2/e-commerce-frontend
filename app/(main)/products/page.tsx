import Pagination from "@/components/products/Pagination";
import { Filter } from "@/app/(main)/products/_components/Filter";
import { ProductGrid } from "@/app/(main)/products/_components/ProductGrid";
import { Category, Product } from "@/types/product";

export interface PaginationMeta {
    total_items?: number;
    limit?: number;
    next_cursor?: string | null;
    prev_cursor?: string | null;
    has_next?: boolean;
    has_prev?: boolean;
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

    try {
        const res = await fetch(apiUrl, { next: { revalidate: 0 } });
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const response = await res.json();
        return {
            products: response.data || [],
            meta: {
                total_items: response.meta?.total_items,
                limit: response.meta?.limit,
                next_cursor: response.meta?.next_cursor ?? null,
                prev_cursor: response.meta?.prev_cursor ?? null,
                has_next: Boolean(response.meta?.has_next),
                has_prev: Boolean(response.meta?.has_prev),
            }
        };
    } catch (error) {
        console.error("Error fetching products", error);
        return {
            products: [],
            meta: {}
        };
    }
}

async function getCategories(): Promise<Category[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`;
    try {
        const res = await fetch(apiUrl, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        if (!json.success || !Array.isArray(json.data)) return [];
        return json.data as Category[];
    } catch {
        return [];
    }
}

export default async function ProductPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const resolvedSearchParams = await searchParams;

    const [{ products, meta }, categories] = await Promise.all([
        getFilterProducts(resolvedSearchParams),
        getCategories(),
    ]);

    return (
        <div className="-mx-[calc((100vw-100%)/2)] px-4 md:px-6 lg:px-8">
            <div className="my-2 grid grid-cols-1 items-start gap-6 lg:my-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
            <aside className="lg:sticky lg:top-24">
                <Filter categories={categories} />
            </aside>
            <main className="flex min-w-0 flex-col gap-8">
                {products.length > 0 ? (

                    <>
                        <ProductGrid products={products} />
                        {(meta.has_next || meta.has_prev) && (
                            <div className="border-t border-black/5 py-8">
                                <Pagination meta={meta} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="glass-card flex min-h-56 flex-col items-center justify-center px-6 py-10">
                        <p className="text-center text-lg font-medium text-neutral-700">No products found</p>
                        <p className="mt-1 text-sm text-muted-foreground">Try adjusting category filters.</p>
                    </div>
                )}
            </main>
            </div>
        </div>
    );
}