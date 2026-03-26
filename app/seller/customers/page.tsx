import SellerCustomerList from "@/app/seller/customers/_components/SellerCustomerList";
import { cookies } from "next/headers";
import SellerProductTablePagination from "@/app/seller/products/_components/SellerProductTablePagination";
import { Customer } from "@/types/customer";

export const metadata = {
    title: "Customers | Seller Center",
    description: "Manage your customers.",
};

interface PaginationMeta {
    total_pages: number;
    current_page: number;
    total_items?: number;
}

async function getSellerCustomers({
    page,
    limit,
}: {
    page: string;
    limit: string;
}): Promise<{ customers: Customer[]; meta: PaginationMeta }> {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/seller/customers?${params.toString()}`;

    const cookieStore = await cookies();
    let customers: Customer[] = [];

    try {
        const res = await fetch(apiUrl, {
            headers: { Cookie: cookieStore.toString() },
            cache: 'no-store',
        })
        if (res.ok) {
            const response = await res.json();
            customers = response.data || [];
            const meta = response.meta || { total_pages: 0, current_page: 1 };
            return { customers, meta };
        }

    } catch (error) {
        console.error("Error fetching customers:", error);
        customers = [];
    }

    return { customers: [], meta: { total_pages: 0, current_page: 1 } };
}

export default async function SellerCustomersPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
    }>;
}) {
    const resolvedParams = await searchParams;
    const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : '1';
    const limit = typeof resolvedParams.limit === 'string' ? resolvedParams.limit : '10';

    const { customers, meta } = await getSellerCustomers({ page, limit });

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Customers
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    View and manage your customer base.
                </p>
            </div>

            <SellerCustomerList customers={customers} />

            {meta.total_pages > 1 && <SellerProductTablePagination meta={meta} />}
        </div>
    );
}
