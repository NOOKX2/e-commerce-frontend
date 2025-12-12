import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// กำหนด Type ของ Order เฉพาะส่วนที่ต้องใช้แสดงผล
interface OrderSuccessProps {
  order: {
    ID: number;
   
  };
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  return (
    <div className="container mx-auto py-20 flex flex-col items-center justify-center text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      
      <p className="text-gray-600 mb-8">
        Your order has been placed successfully. <br />
        <span className="font-semibold text-black">Order ID: #{order.ID}</span>
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}