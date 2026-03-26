import CustomerContactCard from '@/app/seller/customers/[id]/_components/CustomerContactCard';
import CustomerOrderHistory, { CustomerOrder } from '@/app/seller/customers/[id]/_components/CustomerOrderHistory';
import CustomerProfileHeader from '@/app/seller/customers/[id]/_components/CustomerProfileHeader';
import CustomerStatsCard from '@/app/seller/customers/[id]/_components/CustomerStatsCard';
import { cookies } from 'next/headers';

interface CustomerDetailResponse {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    location: string;
    joinedDate: string;
    totalSpent: number;
    totalOrders: number;
    status: string;
    orderHistory: CustomerOrder[];
}

async function getCustomerDetails(customerId: string): Promise<CustomerDetailResponse | null> {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller/customers/${customerId}`, {
            headers: { Cookie: cookieStore.toString() },
            cache: 'no-store',
        });

        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching customer details:", error);
        return null;
    }
}

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const customer = await getCustomerDetails(resolvedParams.id);

    if (!customer) {
        return (
            <div className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
                <p className="text-neutral-600">
                    Customer not found or you don&apos;t have permission to view this customer.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <CustomerProfileHeader
                id={customer.id}
                name={customer.name}
                status={customer.status}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                <div className="flex flex-col gap-6">
                    <CustomerContactCard
                        email={customer.email}
                        phoneNumber={customer.phoneNumber}
                        location={customer.location}
                    />
                    <CustomerStatsCard
                        totalOrders={customer.totalOrders}
                        totalSpent={customer.totalSpent}
                        joinedDate={customer.joinedDate}
                    />
                </div>

                <div className="lg:col-span-2">
                    <CustomerOrderHistory orders={customer.orderHistory} />
                </div>
            </div>
        </div>
    );
}
