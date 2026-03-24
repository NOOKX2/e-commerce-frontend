import Link from "next/link";
import { Order } from "@/types/order";
import OrderCard from "./OrderCard";

export default function OrderList({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 w-100 mt-10">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-xl text-gray-600 font-medium mb-2">No orders found</p>
        <Link href="/" className="btn btn-primary bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-1/2 ">
      {orders.map((order) => (
        <OrderCard key={order.ID} order={order} />
      ))}
    </div>
  );
}