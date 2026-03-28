"use client";

import Link from "next/link";
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  Package,
  Pencil,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function ProfileIcon() {
  const { user, isLoading, logout } = useAuth();

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() ?? "";

  return (
    <div>
      {isLoading ? (
        <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200/80" />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group h-9 gap-1.5 rounded-full border border-neutral-200/80 bg-white/80 px-1 pr-2 shadow-sm",
                "transition-all hover:border-neutral-300 hover:bg-white hover:shadow-md",
                "data-[state=open]:border-neutral-300 data-[state=open]:bg-white data-[state=open]:shadow-md"
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white shadow-inner">
                {initial ? (
                  initial
                ) : (
                  <CircleUserRound className="size-4 text-white/90" aria-hidden />
                )}
              </span>
              <span className="hidden max-w-24 truncate text-xs font-semibold text-neutral-900 sm:inline">
                {user.name}
              </span>
              <ChevronDown
                className="size-3.5 shrink-0 text-neutral-400 transition-transform group-data-[state=open]:-rotate-180"
                aria-hidden
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className={cn(
              "w-[min(14rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-1.5",
              "shadow-lg shadow-neutral-900/8"
            )}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="rounded-lg bg-linear-to-br from-neutral-50 to-neutral-100/80 px-2.5 py-2">
                <p className="truncate text-xs font-semibold text-neutral-900">{user.name}</p>
                <p className="mt-0.5 truncate text-[11px] leading-tight text-neutral-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1.5 bg-neutral-200/70" />
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-2 py-1.5 text-sm focus:bg-neutral-100">
              <Link href="/profile" className="flex w-full items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-neutral-200/80">
                  <UserRound className="size-3.5 text-neutral-600" aria-hidden />
                </span>
                <span className="text-sm font-medium text-neutral-800">Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-2 py-1.5 text-sm focus:bg-neutral-100">
              <Link href="/profile/edit" className="flex w-full items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-neutral-200/80">
                  <Pencil className="size-3.5 text-neutral-600" aria-hidden />
                </span>
                <span className="text-sm font-medium text-neutral-800">Edit profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-2 py-1.5 text-sm focus:bg-neutral-100">
              <Link href="/orders" className="flex w-full items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-neutral-200/80">
                  <Package className="size-3.5 text-neutral-600" aria-hidden />
                </span>
                <span className="text-sm font-medium text-neutral-800">My orders</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5 bg-neutral-200/70" />
            <DropdownMenuItem
              variant="destructive"
              onClick={logout}
              className="cursor-pointer rounded-lg px-2 py-1.5 text-sm focus:bg-red-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 ring-1 ring-red-100">
                <LogOut className="size-3.5 text-red-600" aria-hidden />
              </span>
              <span className="text-sm font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login" passHref>
          <Button className="rounded-full px-5">Login</Button>
        </Link>
      )}
    </div>
  );
}

export default ProfileIcon;
