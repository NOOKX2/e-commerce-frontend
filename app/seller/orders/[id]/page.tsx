import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Clock, Package, Download, Truck, User, Mail, Phone } from 'lucide-react'; // 👈 นำเข้าไอคอนเพิ่ม
import { cookies } from 'next/headers';

// 1. 🌟 เพิ่ม customerInfo เข้าไปใน Interface ให้ตรงกับ DTO
interface SellerOrderDetailResponse {
    orderId: string;
    status: string;
    placedAt: string;
    customerInfo: {
        name: string;
        email: string;
        phoneNumber: string;
    };
    shippingAddress: { addressLine: string };
    items: Array<{
        productId: string;
        name: string;
        sku: string;
        imageUrl: string;
        price: number;
        quantity: number;
        total: number;
    }>;
    sellerSubtotal: number;
}

// ฟังก์ชันดึงข้อมูลจาก Server-side
async function getOrderDetails(id: string): Promise<SellerOrderDetailResponse | null> {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seller/orders/${id}`, {
            headers: { 'Cookie': cookieStore.toString() },
            cache: 'no-store',
        });

        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
    }
}

// Helper สำหรับจัด Format เงิน
const formatMoney = (amount: number) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const order = await getOrderDetails(resolvedParams.id);

    if (!order) {
        return <div className="p-8 text-center text-red-500">Order not found or failed to load.</div>;
    }

    // Logic สีของ Status Badge
    const statusColors: Record<string, string> = {
        'Completed': 'bg-green-100 text-green-800',
        'Processing': 'bg-blue-100 text-blue-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };
    const badgeColor = statusColors[order.status] || 'bg-gray-100 text-gray-800';

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* --- Header Section --- */}
            <div className="flex flex-col gap-4">
                <Link href="/seller/orders" className="flex items-center text-blue-600 hover:underline font-medium w-fit">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
                </Link>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderId}</h1>
                            <span className={`px-3 py-1 inline-flex items-center text-sm font-semibold rounded-full gap-1.5 ${badgeColor}`}>
                                {order.status === 'Completed' && <CheckCircle2 className="h-4 w-4" />}
                                {order.status}
                            </span>
                        </div>
                        <p className="text-gray-500 mt-1 flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 inline" /> Placed on {order.placedAt}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Main Content Layout (Grid) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Items List */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Items purchased from you</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {order.items.map((item) => (
                                <div key={item.productId} className="p-6 flex flex-col sm:flex-row gap-4">
                                    <div className="relative h-24 w-24 shrink-0 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                                        {item.imageUrl ? (
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <Package className="h-10 w-10 text-gray-400 m-auto mt-7" />
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
                                        </div>
                                        <div className="text-right flex flex-col gap-1">
                                            <p className="text-sm text-gray-500">Price: {formatMoney(item.price)}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            <p className="font-semibold text-gray-900 mt-1">Total: {formatMoney(item.total)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Info Cards */}
                <div className="flex flex-col gap-6">
                    
                    {/* 🌟 Customer & Shipping Card ที่อัปเดตใหม่ */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">Customer & Shipping</h2>
                        
                        {/* 1. ข้อมูลผู้ซื้อ (Profile, Name, Email, Phone) */}
                        <div className="flex gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                                <User className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-medium text-gray-900">{order.customerInfo?.name || "Unknown Customer"}</p>
                                {order.customerInfo?.email && (
                                    <p className="flex items-center text-sm text-gray-500 mt-1">
                                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                                        {order.customerInfo.email}
                                    </p>
                                )}
                                {order.customerInfo?.phoneNumber && (
                                    <p className="flex items-center text-sm text-gray-500 mt-1">
                                        <Phone className="h-3.5 w-3.5 mr-1.5" />
                                        {order.customerInfo.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* เส้นคั่นบางๆ */}
                        <hr className="border-gray-100 mb-6" />

                        {/* 2. ข้อมูลที่อยู่จัดส่ง */}
                        <div className="flex gap-3">
                            <Truck className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Shipping Address:</p>
                                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                                    {order.shippingAddress.addressLine}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Earnings Summary</h2>
                        <div className="space-y-3 pb-4 border-b border-gray-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal (Your items):</span>
                                <span className="font-medium text-gray-900">{formatMoney(order.sellerSubtotal)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between pt-4">
                            <span className="text-lg font-bold text-gray-900">Your Total:</span>
                            <span className="text-lg font-bold text-blue-600">{formatMoney(order.sellerSubtotal)}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col gap-3">
                            <button className="flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">
                                <Truck className="h-5 w-5 mr-2" />
                                Track Package
                            </button>
                            <button className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm">
                                <Download className="h-5 w-5 mr-2" />
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}