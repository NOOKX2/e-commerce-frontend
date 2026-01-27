import SellerProductList from "@/components/seller/SellerProductList";

export const metadata = {
    title: "Products | Seller Center",
    description: "Manage your products inventory.",
};

export default function SellerProductsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-500">Manage your product inventory and catalog.</p>
            </div>

            <SellerProductList />
        </div>
    );
}
