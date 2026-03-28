"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ORDER_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "complete", label: "Complete" },
  { value: "cancelled", label: "Cancelled" },
] as const;

function normalizeOrderStatusForSelect(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (s === "completed") return "complete";
  const allowed = new Set(ORDER_STATUSES.map((x) => x.value));
  if (allowed.has(s)) return s;
  if (s.includes("complete") || s === "paid") return "complete";
  return "pending";
}

function statusLabel(value: string): string {
  return ORDER_STATUSES.find((s) => s.value === value)?.label ?? value;
}

export default function AdminOrderStatusControl({
  orderId,
  initialStatus,
}: {
  orderId: number;
  initialStatus: string;
}) {
  const router = useRouter();
  const initialValue = normalizeOrderStatusForSelect(initialStatus);
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setValue(normalizeOrderStatusForSelect(initialStatus));
  }, [initialStatus]);

  const normalizedInitial = normalizeOrderStatusForSelect(initialStatus);
  const dirty = value !== normalizedInitial;

  async function performStatusUpdate() {
    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: value }),
        }
      );
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to update status");
      }
      toast.success("Order status updated");
      setConfirmOpen(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-9">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">Order status</h2>
      <p className="mt-1 text-sm text-neutral-500">Update fulfillment status for this order.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          className="h-11 shrink-0 rounded-2xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700 sm:min-w-40"
          disabled={!dirty || saving}
          onClick={() => setConfirmOpen(true)}
        >
          Update status
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={(open) => !saving && setConfirmOpen(open)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirm status change</DialogTitle>
            <DialogDescription className="space-y-2 pt-1 text-left text-neutral-600">
              <span className="block">
                Order <span className="font-mono font-semibold text-slate-900">#{orderId}</span> will change
                from{" "}
                <span className="font-semibold text-slate-900">{statusLabel(normalizedInitial)}</span> to{" "}
                <span className="font-semibold text-slate-900">{statusLabel(value)}</span>.
              </span>
              <span className="block">Continue?</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled={saving}
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="rounded-xl bg-blue-600 hover:bg-blue-700"
              disabled={saving}
              onClick={() => void performStatusUpdate()}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Saving…
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
