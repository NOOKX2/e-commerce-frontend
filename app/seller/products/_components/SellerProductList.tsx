
import { SellerProduct } from '@/types/product';
import SellerProductHeader from './SellerProductHeader';
import SellerProductTable from './SellerProductTable';
import SellerProductTablePagination from './SellerProductTablePagination';

interface PaginationMeta {
    total_items?: number;
    limit?: number;
    next_cursor?: string | null;
    prev_cursor?: string | null;
    has_next?: boolean;
    has_prev?: boolean;
}

interface SellerProductListProps {
    products: SellerProduct[];
    meta: PaginationMeta;
}

export default async function SellerProductPage({ products, meta }: SellerProductListProps) {

    return (
        <div className="space-y-8">
            <SellerProductHeader />
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <SellerProductTable products={products} />
                {(meta.has_next || meta.has_prev) && (
                    <SellerProductTablePagination meta={meta} />
                )}
            </div>
        </div>
    );
}