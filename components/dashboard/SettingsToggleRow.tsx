import { Label } from "@/components/ui/label";

export default function SettingsToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-2">
      <div>
        <Label htmlFor={id} className="text-sm font-bold text-slate-900">
          {label}
        </Label>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <div className="peer h-7 w-12 rounded-full bg-slate-200 transition-colors after:absolute after:top-0.5 after:left-0.5 after:h-6 after:w-6 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30" />
      </label>
    </div>
  );
}
