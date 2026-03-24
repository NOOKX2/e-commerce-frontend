"use client";

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductTableActionsProps {
    slug: string;
    sku: string;
}

function ProductTableAction({slug, sku}: ProductTableActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) {
            return
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/products/${sku}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to delete product");
            }

            alert("Product deleted successfully");
            router.refresh();

        } catch(error : any) {
            console.error("Error deleting product:", error);
            alert(`Error: ${error.message}`);
        }
    }
    return (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/seller/products/${slug}/edit`}>
                <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                </button>
            </Link>
            
            <button 
                onClick={handleDelete} 
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 className="h-4 w-4" />
            </button>
            
            <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="h-4 w-4" />
            </button>
        </div>
    )
}

export default ProductTableAction
