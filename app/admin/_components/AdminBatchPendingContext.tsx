"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AdminBatchPendingContextValue = {
  pendingCount: number;
  setPendingCount: (n: number) => void;
};

const AdminBatchPendingContext = createContext<AdminBatchPendingContextValue | null>(null);

export function AdminBatchPendingProvider({ children }: { children: ReactNode }) {
  const [pendingCount, setPendingCountState] = useState(0);

  const setPendingCount = useCallback((n: number) => {
    setPendingCountState(Math.max(0, Math.floor(n)));
  }, []);

  const value = useMemo(
    () => ({ pendingCount, setPendingCount }),
    [pendingCount, setPendingCount]
  );

  return (
    <AdminBatchPendingContext.Provider value={value}>{children}</AdminBatchPendingContext.Provider>
  );
}

export function useAdminBatchPending() {
  const ctx = useContext(AdminBatchPendingContext);
  if (!ctx) {
    throw new Error("useAdminBatchPending must be used within AdminBatchPendingProvider");
  }
  return ctx;
}

/** Safe for optional use (returns null outside admin shell). */
export function useAdminBatchPendingSafe() {
  return useContext(AdminBatchPendingContext);
}
