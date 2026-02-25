import SellerProductHeader from '@/components/seller/product/SellerProductHeader';
import SellerProductTable from '@/components/seller/product/SellerProductTable';
import SellerProductTablePagination from '@/components/seller/product/SellerProductTablePagination';
import { SellerProduct } from '@/types/product';

interface PaginationMeta {
    total_pages: number;
    current_page: number;
    total_items?: number;
}

interface SellerProductListProps {
    products: SellerProduct[];
    meta: PaginationMeta;
}

export default async function SellerProductPage({ products, meta }: SellerProductListProps) {

    return (
        <div className="space-y-6">
            <SellerProductHeader />
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <SellerProductTable products={products} />
                {meta.total_pages > 1 && (
                    <SellerProductTablePagination meta={meta} />
                )}
            </div>
        </div>
    );
}