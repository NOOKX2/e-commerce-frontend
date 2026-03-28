// _components/GeneralInfoForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  slug: string;
  description: string | null;
  onChange: (field: string, value: string) => void;
}

export function GeneralInfoForm({ name, slug, description, onChange }: Props) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">General Information</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Product Name</Label>
          <Input value={name} onChange={(e) => onChange("name", e.target.value)} className="h-12 rounded-2xl bg-slate-50/50" />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Slug (URL)</Label>
          <Input value={slug} onChange={(e) => onChange("slug", e.target.value)} className="h-12 rounded-2xl bg-slate-50/50 font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Description</Label>
          <textarea 
            value={description || ""} 
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full min-h-32 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </div>
  );
}