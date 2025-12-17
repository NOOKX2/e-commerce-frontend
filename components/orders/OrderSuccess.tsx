import { CheckCircle } from "lucide-react";
import { Order } from "@/types/order";
import OrderItemCard from "./OrderItemCard";
import OrderInformation from "./OrderInformation";


interface OrderSuccessProps {
  order: Order
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  return (
    <div className="container mx-auto py-4 flex flex-col items-center justify-center text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>

      <p className="text-gray-600 mb-2">
        Your order has been placed successfully. <br />
        <span className="font-semibold text-black">Order ID: #{order.ID}</span>
      </p>


      <div className="grid grid-cols-[7fr_3fr] gap-10">
        <div className=" mb-8 border w-full border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
          {order.items?.map((item) => (
            <OrderItemCard key={item.ID} item={item} />
          ))}
        </div>
         <div className="mb-8 w-full">
          <OrderInformation order={order} />
        </div>
      </div>
    </div>
  );
}