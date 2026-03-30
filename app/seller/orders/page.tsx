import SellerOrderTable from '@/app/seller/orders/_components/SellerOrderTable';
import { SellerOrder } from '@/types/sellerOrder';
import { cookies } from 'next/headers';
import SellerProductTablePagination from '@/app/seller/products/_components/SellerProductTablePagination';
import { SellerTableToolbar } from '../_components/SellerToolbar';

interface PaginationMeta {
    total_pages: number;
    current_page: number;
    total_items?: number;
}

// 1. เพิ่ม parameter 'search' เข้ามา
async function getSellerOrders({
    page,
    limit,
    search, 
}: {
    page: string;
    limit: string;
    search: string;
}): Promise<{ orders: SellerOrder[]; meta: PaginationMeta }> {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    
    // 2. ถ้ามีคำค้นหา ให้แปะเข้าไปใน URL ของ API
    if (search) {
        params.set('search', search);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1/seller/orders?${params.toString()}`;
    const cookieStore = await cookies();

    try {
        const res = await fetch(apiUrl, {
            headers: { Cookie: cookieStore.toString() },
            cache: 'no-store',
        });

        if (!res.ok) { 
            const errorText = await res.text(); 
            console.error("🔥 Error from Go Backend:", errorText);
            throw new Error('Failed to fetch seller orders');
        }

        const response = await res.json();
        return {
            orders: response?.data || [],
            meta: response?.meta || { total_pages: 0, current_page: 1 },
        };
    } catch (error) {
        console.error('Error fetching seller orders:', error);
        return { orders: [], meta: { total_pages: 0, current_page: 1 } };
    }
}

export default async function SellerOrdersPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string; // 3. รับค่า search จาก URL
    }>;
}) {
    const resolvedParams = await searchParams;
    const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : '1';
    const limit = typeof resolvedParams.limit === 'string' ? resolvedParams.limit : '10';
    // 4. ดึงค่า search ออกมา (ถ้าไม่มีให้เป็น string ว่าง)
    const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';

    // 5. ส่งค่า search ไปให้ API
    const { orders, meta } = await getSellerOrders({ page, limit, search });

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                        Orders
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Manage and track your customer orders.
                    </p>
                </div>
            </div>

            {/* 6. เรียกใช้ Toolbar */}
            <SellerTableToolbar placeholder="Search orders by ID or customer..." />

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <SellerOrderTable recentOrders={orders} />
                {meta.total_pages > 1 && <SellerProductTablePagination meta={meta} />}
            </div>
        </div>
    );
}