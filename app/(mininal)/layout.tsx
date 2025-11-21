import MinimalNavbar from "@/components/layout/minimal-navbar";
import Link from "next/link";

export default function MinimalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <MinimalNavbar />

            {children}

        </div>

    )
}