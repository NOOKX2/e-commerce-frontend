import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Uppercase label style shared by admin/seller settings forms. */
export function FormFieldLabel({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        "text-[11px] font-bold uppercase tracking-widest text-slate-400",
        className
      )}
    >
      {children}
    </Label>
  );
}
