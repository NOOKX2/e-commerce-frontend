import { cn } from "@/lib/utils";

type LucideIcon = React.ComponentType<{ className?: string }>;

/**
 * Rounded settings section shell (admin platform settings + seller shop settings).
 * Uses same radii/typography as seller (`rounded-4xl` ≈ 2rem).
 */
export default function SettingsSectionCard({
  title,
  subtitle,
  icon: Icon,
  iconWrapperClassName,
  iconClassName,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** e.g. bg-slate-50, bg-emerald-50 */
  iconWrapperClassName?: string;
  /** e.g. text-slate-600, text-emerald-700 */
  iconClassName?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "space-y-6 rounded-4xl border border-slate-100 bg-white p-8 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            iconWrapperClassName ?? "bg-slate-50"
          )}
        >
          <Icon className={cn("h-5 w-5", iconClassName ?? "text-slate-600")} />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
