import type { User } from "@/types/user";

const SUSPENDED_MSG = "your account is suspended";

export function isAccountSuspended(user: User | null | undefined): boolean {
  return user?.status === "suspended";
}

export function suspendedAccountMessage(): string {
  return SUSPENDED_MSG;
}
