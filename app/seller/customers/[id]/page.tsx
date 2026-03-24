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
            headers: { 'Cookie': cookieStore.toString() },
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

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const customer = await getCustomerDetails(resolvedParams.id);

    if (!customer) {
        return (
            <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto mt-10">
                Customer not found or you don't have permission to view this customer.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            
            {/* 1. ส่วน Header (ชื่อ, สถานะ, ปุ่ม Back) */}
            <CustomerProfileHeader 
                id={customer.id} 
                name={customer.name} 
                status={customer.status} 
            />

            {/* --- Main Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2. ฝั่งซ้าย (กินพื้นที่ 1 ส่วน) - ข้อมูลติดต่อ และ สรุปยอดรวม */}
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

                {/* 3. ฝั่งขวา (กินพื้นที่ 2 ส่วน) - ตารางประวัติการสั่งซื้อ */}
                <div className="lg:col-span-2">
                    <CustomerOrderHistory orders={customer.orderHistory} />
                </div>

            </div>
        </div>
    );
}