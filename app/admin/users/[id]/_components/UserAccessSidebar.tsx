// _components/UserAccessSidebar.tsx
import { Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
  role: string;
  status: string;
  createdAt?: string;
  onRoleChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  /** When true, status cannot be changed (e.g. viewing your own admin account). */
  statusSelectDisabled?: boolean;
}

export function UserAccessSidebar({
  role,
  status,
  createdAt,
  onRoleChange,
  onStatusChange,
  statusSelectDisabled = false,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Role Card */}
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Access Control</h2>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">User Role</Label>
          <Select value={role} onValueChange={onRoleChange}>
            <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-black uppercase text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["buyer", "seller", "admin"].map((r) => (
                <SelectItem key={r} value={r} className="text-[11px] font-bold uppercase">{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Account Status</h2>
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Current Status</Label>
          <Select
            value={status}
            onValueChange={onStatusChange}
            disabled={statusSelectDisabled}
          >
            <SelectTrigger className={cn(
              "h-12 rounded-2xl border-slate-100 font-black uppercase text-xs",
              status === 'banned' ? "bg-red-50 text-red-600" : "bg-slate-50/50"
            )}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["active", "suspended", "banned"].map((s) => (
                <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-slate-50 p-6 rounded-4xl border border-slate-100 flex items-center gap-3 text-slate-500">
        <Calendar className="h-4 w-4" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest">Joined Date</p>
          <p className="text-xs font-semibold">{createdAt ? new Date(createdAt).toLocaleDateString('en-GB') : "Unknown"}</p>
        </div>
      </div>
    </div>
  );
}