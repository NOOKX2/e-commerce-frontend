"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AdminProduct = {
  ID: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  sellerId: number;
  seller?: { name?: string };
  category?: { name?: string };
};

const statuses = ["active", "inactive", "draft", "archived"];

export default function ProductsClient({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);


  async function updateStatus(productID: number, status: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/products/${productID}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok || !payload?.success) throw new Error(payload?.error ?? "Failed to update status");
  }

  console.log(initialProducts);

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-xs">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Seller</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p) => (
            <tr key={p.ID}>
              <td className="px-6 py-4">{p.name}</td>
              <td className="px-6 py-4">{p.seller?.name ?? `Seller #${p.sellerId}`}</td>
              <td className="px-6 py-4">{p.category?.name ?? "-"}</td>
              <td className="px-6 py-4">${p.price?.toFixed(2)}</td>
              <td className="px-6 py-4">{p.quantity}</td>
              <td className="px-6 py-4">
                <Select
                  value={p.status}
                  onValueChange={(value) =>
                    setProducts((prev) => prev.map((x) => (x.ID === p.ID ? { ...x, status: value } : x)))
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      await updateStatus(p.ID, p.status);
                      toast.success("Product status updated");
                    } catch (e) {
                      toast.error(e instanceof Error ? e.message : "Update failed");
                    }
                  }}
                >
                  Save
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

