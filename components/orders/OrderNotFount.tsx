import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface OrderErrorProps {
  message?: string;
}

export default function OrderError({ message }: OrderErrorProps) {
  return (
    <div className="container mx-auto py-20 flex flex-col items-center justify-center text-center">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-red-700">Something went wrong</h1>
      
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an error while retrieving your order details. <br />
        <span className="text-red-500 text-sm mt-2 block bg-red-50 p-2 rounded">
            Error: {message || "Unknown Server Error"}
        </span>
      </p>

      <div className="flex gap-4">
        <Button asChild variant="secondary">
           <Link href="/contact">Contact Support</Link>
        </Button>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}