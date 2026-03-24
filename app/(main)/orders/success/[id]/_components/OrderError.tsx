import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react"; // ใช้ไอคอนค้นหาไม่เจอ

interface OrderNotFoundProps {
  id: string;
}

export default function OrderNotFound({ id }: OrderNotFoundProps) {
  return (
    <div className="container mx-auto py-20 flex flex-col items-center justify-center text-center">
      <SearchX className="w-20 h-20 text-orange-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-orange-700">Order Not Found</h1>
      
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-8">
        <p className="text-gray-700">
            We could not find any order matching ID: <span className="font-bold text-black">#{id}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
            Please check your URL or try creating a new order.
        </p>
      </div>

      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}