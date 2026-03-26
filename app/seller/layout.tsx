import SellerSidebar from "@/components/seller/SellerSidebar";
import SellerHeader from "@/components/seller/SellerHeader";

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen font-sans text-foreground">
            <SellerSidebar />
            <div className="flex min-w-0 flex-1 flex-col bg-neutral-50">
                <SellerHeader />
                <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
