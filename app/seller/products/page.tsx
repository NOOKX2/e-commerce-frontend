import SellerProductList from "@/app/seller/products/_components/SellerProductList";
import { cookies } from "next/headers";

export const metadata = {
    title: "Products | Seller Center",
    description: "Manage your products inventory.",
};

async function getSellerProducts(searchParams: { limit?: string; search?: string; cursor?: string; before?: string }) {
    const params = new URLSearchParams();
    params.set('limit', searchParams.limit || '10');

    if (searchParams.search) {
        params.set('search', searchParams.search);
    }
    if (searchParams.cursor) {
        params.set('cursor', searchParams.cursor);
    }
    if (searchParams.before) {
        params.set('before', searchParams.before);
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
            meta: response.meta || {}
        };
    } catch (error) {
        console.error(error);
        return { products: [], meta: {} };
    }
}

export default async function SellerProductsPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const resolvedParams = await searchParams
    const fetchParams = {
        limit: typeof resolvedParams.limit === 'string' ? resolvedParams.limit : '10',
        search: typeof resolvedParams.search === 'string' ? resolvedParams.search : '',
        cursor: typeof resolvedParams.cursor === 'string' ? resolvedParams.cursor : '',
        before: typeof resolvedParams.before === 'string' ? resolvedParams.before : '',
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
