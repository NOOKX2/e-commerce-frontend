// _components/UserPersonalInfoCard.tsx
import { User as UserIcon, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  initialName: string;
  currentName: string;
  email: string;
  onNameChange: (val: string) => void;
}

export function UserPersonalInfoCard({ initialName, currentName, email, onNameChange }: Props) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-8">
      <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-50">
          <UserIcon className="h-8 w-8 text-slate-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">{initialName}</h2>
          <p className="text-sm font-medium text-slate-500">{email}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
          <Input
            value={currentName}
            onChange={(e) => onNameChange(e.target.value)}
            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 font-semibold text-slate-900"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input value={email} disabled className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-10 text-slate-500 cursor-not-allowed" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 ml-1 mt-1">Email cannot be changed by the administrator.</p>
        </div>
      </div>
    </div>
  );
}