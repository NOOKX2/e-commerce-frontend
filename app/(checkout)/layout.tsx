import Link from "next/link";
import { Lock } from "lucide-react"; 

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href='/' className="text-xl font-bold text-black tracking-tight">Ultimate E-Commerce</Link>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Lock className="w-4 h-4"/>
                        <span className="text-sm font-medium flex items-center gap-1">
                            Checkout
                        </span>
                    </div>
                </div>
            </header>
        </div>
    )
}