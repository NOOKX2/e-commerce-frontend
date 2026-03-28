"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryDialog, { type CategoryFormValues } from "./CategoryDialog";

export type AdminCategory = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export default function CategoriesClient({
  initialCategories,
}: {
  initialCategories: AdminCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [categories, setCategories] = useState<AdminCategory[]>(initialCategories);
  const [input, setInput] = useState(() => searchParams.get("q") ?? "");

  useEffect(() => {
    setInput(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : ""
        );
        const trimmed = input.trim();
        if (trimmed) params.set("q", trimmed);
        else params.delete("q");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    }, 400);
    return () => clearTimeout(t);
  }, [input, pathname, router]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Pick<AdminCategory, "id" | "name" | "slug"> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filtered = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );
  }, [categories, input]);

  async function createCategory(values: CategoryFormValues) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const payload = (await res.json().catch(() => null)) as ApiResponse<AdminCategory> | null;
    if (!res.ok || !payload?.success || !payload.data) {
      throw new Error(payload?.error ?? "Failed to create category");
    }
    return payload.data;
  }

  async function updateCategory(id: number, values: CategoryFormValues) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/categories/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      }
    );
    const payload = (await res.json().catch(() => null)) as ApiResponse<AdminCategory> | null;
    if (!res.ok || !payload?.success || !payload.data) {
      throw new Error(payload?.error ?? "Failed to update category");
    }
    return payload.data;
  }

  async function deleteCategory(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/categories/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const payload = (await res.json().catch(() => null)) as ApiResponse<unknown> | null;
    if (!res.ok || !payload?.success) {
      throw new Error(payload?.error ?? "Failed to delete category");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xs">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search categories..."
            className={isPending ? "w-full border-blue-200 sm:w-72" : "w-full sm:w-72"}
          />
        </div>

        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          Create Category
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{c.id}</td>
                <td className="px-6 py-4 text-gray-700">{c.name}</td>
                <td className="px-6 py-4 text-gray-700">{c.slug}</td>
                <td className="px-6 py-4 text-gray-500">
                  {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditing({ id: c.id, name: c.name, slug: c.slug });
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        const ok = window.confirm(`Delete category "${c.name}"?`);
                        if (!ok) return;
                        try {
                          await deleteCategory(c.id);
                          setCategories((prev) => prev.filter((x) => x.id !== c.id));
                          toast.success("Category deleted");
                        } catch (e) {
                          toast.error(e instanceof Error ? e.message : "Delete failed");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td className="px-6 py-10 text-gray-500" colSpan={5}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditing(null);
        }}
        initialValues={editing}
        isSubmitting={isSubmitting}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          try {
            if (editing?.id) {
              const updated = await updateCategory(editing.id, values);
              setCategories((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
              toast.success("Category updated");
            } else {
              const created = await createCategory(values);
              setCategories((prev) => [created, ...prev]);
              toast.success("Category created");
            }
            setDialogOpen(false);
            setEditing(null);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Save failed");
          } finally {
            setIsSubmitting(false);
          }
        }}
      />
    </div>
  );
}

