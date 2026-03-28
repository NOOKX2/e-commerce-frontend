import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  status: string;
  imageUrl: string | null;
  categoryName?: string;
  sellerName?: string;
  onStatusChange: (val: string) => void;
}

export function ProductSidebar({ status, imageUrl, categoryName, sellerName, onStatusChange }: Props) {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Status</h2>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="h-12 rounded-2xl bg-slate-50/50 font-bold uppercase text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["active", "inactive", "draft", "archived"].map((s) => (
              <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Media */}
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Media</h2>
        <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:bg-slate-100 transition-colors">
          {imageUrl ? (
            <Image src={imageUrl} alt="Product" fill className="object-cover" />
          ) : (
            <div className="text-center space-y-2">
              <ImageIcon className="h-8 w-8 text-slate-400 mx-auto" />
              <span className="text-xs font-bold text-slate-400">Upload Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Organization</h2>
        <div className="space-y-4">
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</p>
             <p className="text-sm font-semibold text-slate-900">{categoryName || "Uncategorized"}</p>
           </div>
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Seller</p>
             <p className="text-sm font-semibold text-blue-600">{sellerName || "Unknown Seller"}</p>
           </div>
        </div>
      </div>
    </div>
  );
}