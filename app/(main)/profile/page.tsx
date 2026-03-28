import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, Package, Pencil, Shield, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile",
};

function roleBadgeClass(role: string) {
  const r = role.toLowerCase();
  if (r === "admin") return "border-violet-200 bg-violet-50 text-violet-800";
  if (r === "seller") return "border-amber-200 bg-amber-50 text-amber-900";
  return "border-slate-200 bg-slate-50 text-slate-800";
}

function formatRole(role: string) {
  const r = role.toLowerCase();
  if (r === "buyer") return "Buyer";
  if (r === "seller") return "Seller";
  if (r === "admin") return "Admin";
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  const initial = user.name?.trim()?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* 📌 Header Zone: จัด Flex แบบ Justify-Between เพื่อดันปุ่ม Edit ไปขวาสุด */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Profile</h1>
          <p className="mt-2 text-neutral-600">Your account details and role.</p>
        </div>
        
        {/* 📌 ย้ายปุ่ม Edit Profile มาไว้ตรงนี้ */}
        <Button asChild className="h-10 shrink-0 rounded-2xl bg-neutral-900 text-sm font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95">
          <Link href="/profile/edit" className="inline-flex items-center justify-center gap-2">
            <Pencil className="h-4 w-4" aria-hidden />
            Edit Profile
          </Link>
        </Button>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm">
        <div className="border-b border-neutral-100 bg-linear-to-br from-neutral-50 to-white px-8 py-10 sm:px-10">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-3xl font-bold text-white shadow-inner"
              aria-hidden
            >
              {initial}
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">{user.name}</h2>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-neutral-500 sm:justify-start">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{user.email}</span>
              </p>
              <span
                className={cn(
                  "mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  roleBadgeClass(user.role)
                )}
              >
                <Shield className="h-3.5 w-3.5" aria-hidden />
                {formatRole(user.role)}
              </span>
            </div>
          </div>
        </div>

        <dl className="divide-y divide-neutral-100 px-8 py-2 sm:px-10">
          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <UserRound className="h-4 w-4" aria-hidden />
              Name
            </dt>
            <dd className="text-sm font-semibold text-neutral-900">{user.name}</dd>
          </div>
          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </dt>
            <dd className="break-all text-sm font-semibold text-neutral-900">{user.email}</dd>
          </div>
          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <Shield className="h-4 w-4" aria-hidden />
              Role
            </dt>
            <dd className="text-sm font-semibold text-neutral-900">{formatRole(user.role)}</dd>
          </div>
          <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm font-medium text-neutral-500">User ID</dt>
            <dd className="font-mono text-sm font-semibold text-neutral-900">#{user.ID}</dd>
          </div>
        </dl>
      </div>

      {/* Action Buttons ด้านล่าง */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button asChild className="h-11 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800">
          <Link href="/orders" className="inline-flex items-center justify-center gap-2">
            <Package className="h-4 w-4" aria-hidden />
            My orders
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-2xl border-neutral-200 bg-white hover:bg-neutral-50">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    </div>
  );
}