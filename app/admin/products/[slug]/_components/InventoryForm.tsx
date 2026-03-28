// _components/InventoryForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  price: number;
  quantity: number;
  onChange: (field: string, value: number) => void;
}

export function InventoryForm({ price, quantity, onChange }: Props) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
      <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Pricing & Inventory</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Price (฿)</Label>
          <Input type="number" value={price} onChange={(e) => onChange("price", Number(e.target.value))} className="h-12 rounded-2xl bg-slate-50/50 font-black text-lg" />
        </div>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Stock Quantity</Label>
          <Input type="number" value={quantity} onChange={(e) => onChange("quantity", Number(e.target.value))} className="h-12 rounded-2xl bg-slate-50/50 font-bold" />
        </div>
      </div>
    </div>
  );
}