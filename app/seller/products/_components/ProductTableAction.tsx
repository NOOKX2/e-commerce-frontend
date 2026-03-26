"use client";

import { useState } from "react";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableActionsProps {
  slug: string;
  sku: string;
}

function ProductTableAction({ slug, sku }: ProductTableActionsProps) {
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/seller/products/${sku}`,
        { method: "DELETE", credentials: "include" }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error || errorData?.message || "Failed to delete product"
        );
      }

      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-blue-700"
            aria-label="Product actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="rounded-2xl">
          <DropdownMenuItem asChild>
            <Link
              href={`/seller/products/${slug}`}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={`/seller/products/${slug}/edit`}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsConfirmOpen(true);
            }}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogPrimitive.Root open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogPrimitive.Portal>
          <div className="fixed inset-0 z-50" aria-hidden>
            <AlertDialogPrimitive.Overlay className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <AlertDialogPrimitive.Content className="absolute left-1/2 top-1/2 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-xl">
              <AlertDialogPrimitive.Title className="text-base font-semibold tracking-tight text-slate-900">
                Delete this product?
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 text-sm text-neutral-600">
                This action cannot be undone. The product will be removed from your
                catalog.
              </AlertDialogPrimitive.Description>

              <div className="mt-6 flex justify-end gap-2">
                <AlertDialogPrimitive.Cancel asChild>
                  <button
                    type="button"
                    className="rounded-2xl bg-neutral-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-neutral-200/80 disabled:opacity-50"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                </AlertDialogPrimitive.Cancel>

                <AlertDialogPrimitive.Action asChild>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting…" : "Delete"}
                  </button>
                </AlertDialogPrimitive.Action>
              </div>
            </AlertDialogPrimitive.Content>
          </div>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    </div>
  );
}

export default ProductTableAction;
