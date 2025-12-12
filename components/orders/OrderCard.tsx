import Link from "next/link";
import { Order } from "@/types/order";
import OrderItemCard from "./OrderItemCard";

// Helper: เลือกสีป้ายสถานะ
const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return styles[status.toLowerCase()] || styles.default;
};

// Helper: จัดรูปแบบวันที่
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-EN", {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
      
      {/* --- Header --- */}
      <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-100">
        <div className="mb-2 md:mb-0">
          <span className="font-semibold text-gray-700">Order #{order.ID}</span>
          <span className="text-sm text-gray-500 ml-3 pl-3 border-l border-gray-300">
             {formatDate(order.createdAt)} 
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusBadge(order.status)}`}>
            {order.status}
          </span>
          <span className="font-bold text-lg text-gray-900">
            ฿{order.totalAmount.toLocaleString()} 
          </span>
        </div>
      </div>

      {/* --- Items Body --- */}
      <div className="p-5 bg-white">
        {order.items?.map((item) => (
          <OrderItemCard key={item.ID} item={item} />
        ))}
      </div>
      
      {/* --- Footer --- */}
      <div className="px-6 py-3 bg-gray-50 text-right border-t border-gray-100">
        <Link 
          href={`/order/success/${order.ID}`} 
          className="text-blue-600 hover:text-blue-800 text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1"
        >
          View Invoice <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}