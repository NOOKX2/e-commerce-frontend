import SellerCustomerList from "@/components/seller/SellerCustomerList";

export const metadata = {
    title: "Customers | Seller Center",
    description: "Manage your customers.",
};

export default function SellerCustomersPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-500">View and manage your customer base.</p>
            </div>

            <SellerCustomerList />
        </div>
    );
}
