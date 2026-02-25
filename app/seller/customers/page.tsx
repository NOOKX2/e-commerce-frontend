import SellerCustomerList from "@/components/seller/customer/SellerCustomerList";
import { cookies } from "next/headers";

export const metadata = {
    title: "Customers | Seller Center",
    description: "Manage your customers.",
};

export default async function SellerCustomersPage() {
    const cookieStore = await cookies();
    let customers = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller/customers`, {
            headers: { 'Cookie': cookieStore.toString() },
            cache: 'no-store',
        })
        if (res.ok) {
            const response = await res.json();
            customers = response.data
        }

    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-500">View and manage your customer base.</p>
            </div>

            <SellerCustomerList customers={customers} />
        </div>
    );
}
