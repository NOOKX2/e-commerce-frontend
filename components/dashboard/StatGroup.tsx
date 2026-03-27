import { ReactNode } from "react";

interface StatGroupProps {
  children: ReactNode;
  columns?: 4 | 5;
}

export default function StatGroup({ children, columns = 4 }: StatGroupProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 ${
      columns === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
    }`}>
      {children}
    </div>
  );
}