import Image from "next/image";
import { OrderItem } from "@/types/order";

export default function OrderItemCard({ item }: { item: OrderItem }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-4">
        {/* --- รูปภาพ (ใช้ imageUrl) --- */}
        <div className="relative w-14 h-14 bg-gray-100 rounded-md shrink-0 overflow-hidden border border-gray-200">
          {item.product?.imageUrl ? (
            <Image
              src={item.product.imageUrl} // ✅ ใช้ camelCase
              alt={item.product.name}
              fill
              className="object-cover"
              sizes="60px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
          )}
        </div>

        {/* --- ข้อมูลสินค้า --- */}
        <div>
          <p className="font-medium text-gray-800 text-sm">
            {item.product?.name || `Product #${item.productId}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Qty: {item.quantity} x ฿{item.priceAtPurchase.toLocaleString()} {/* ✅ camelCase */}
          </p>
        </div>
      </div>

      {/* --- ราคารวมต่อชิ้น --- */}
      <p className="font-medium text-gray-700 text-sm">
        ฿{(item.quantity * item.priceAtPurchase).toLocaleString()} {/* ✅ camelCase */}
      </p>
    </div>
  );
}