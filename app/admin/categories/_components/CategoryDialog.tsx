"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof schema>;

export type AdminCategory = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
};

export default function CategoryDialog({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Pick<AdminCategory, "id" | "name" | "slug"> | null;
  onSubmit: (values: CategoryFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? "",
      slug: initialValues?.slug ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      slug: initialValues?.slug ?? "",
    });
  }, [initialValues, form]);

  const title = initialValues?.id ? "Edit Category" : "Create Category";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Slug is optional. If omitted, it will be generated from the name.
          </DialogDescription>
        </DialogHeader>

        <form
          className="mt-4 space-y-4"
          onSubmit={form.handleSubmit(async (values) => onSubmit(values))}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g. Electronics" {...form.register("name")} />
            {form.formState.errors.name?.message && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="e.g. electronics" {...form.register("slug")} />
            {form.formState.errors.slug?.message && (
              <p className="text-sm text-red-600">{form.formState.errors.slug.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={!!isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!!isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

