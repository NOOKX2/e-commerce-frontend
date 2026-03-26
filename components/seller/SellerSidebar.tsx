"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "Products", icon: ShoppingBag },
  { href: "/seller/orders", label: "Orders", icon: Package },
  { href: "/seller/customers", label: "Customers", icon: Users },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-white shadow-sm">
      <div className="flex h-16 items-center px-5">
        <Link
          href="/seller"
          className="text-3xl font-semibold tracking-tight text-slate-900"
        >
          Seller Center
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== "/seller" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "font-semibold text-blue-600"
                  : "font-normal text-neutral-500 hover:text-neutral-800"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-blue-600" : "text-neutral-400"
                )}
                aria-hidden
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
      </div>
    </aside>
  );
}
