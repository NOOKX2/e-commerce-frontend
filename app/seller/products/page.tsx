import SellerProductList from "@/app/seller/products/_components/SellerProductList";
import { cookies } from "next/headers";

export const metadata = {
    title: "Products | Seller Center",
    description: "Manage your products inventory.",
};

async function getSellerProducts(searchParams: { page?: string; limit?: string; search?: string }) {
    const params = new URLSearchParams();
    params.set('page', searchParams.page || '1');
    params.set('limit', searchParams.limit || '10');

    if (searchParams.search) {
        params.set('search', searchParams.search);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/seller/products?${params.toString()}`;
    
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                'Cookie': `session_token=${token}`, 
                'Content-Type': 'application/json',
            },
            cache: 'no-store' 
        });
        if (!res.ok) throw new Error('Failed to fetch seller products');
        
        const response = await res.json();

        return {
            products: response.products || [],
            meta: response.meta || { total_pages: 0, current_page: 1 }
        };
    } catch (error) {
        console.error(error);
        return { products: [], meta: { total_pages: 0, current_page: 1 } };
    }
}

export default async function SellerProductsPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const resolvedParams = await searchParams
    const fetchParams = {
        page: typeof resolvedParams.page === 'string' ? resolvedParams.page : '1',
        limit: typeof resolvedParams.limit === 'string' ? resolvedParams.limit : '10',
        search: typeof resolvedParams.search === 'string' ? resolvedParams.search : '', 
    };
    const { products, meta } = await getSellerProducts(fetchParams);
    
    return (
        <div className="mx-auto max-w-7xl space-y-8 py-0">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Products
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    Manage your product inventory and catalog.
                </p>
            </div>

            <SellerProductList products={products} meta={meta}/>
        </div>
    );
}
