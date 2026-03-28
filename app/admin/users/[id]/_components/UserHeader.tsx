// _components/UserHeader.tsx
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  userId: number;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export function UserHeader({ userId, hasChanges, isSaving, onSave }: Props) {
  const router = useRouter();
  return (
    <div className={cn(
      "sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-4xl border transition-all duration-300",
      hasChanges ? "border-blue-200 ring-4 ring-blue-500/5 shadow-md" : "border-slate-100 shadow-sm"
    )}>
      <div className="flex items-center gap-4 ml-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">Edit User</h1>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">ID: #{userId}</p>
        </div>
      </div>

      <Button
        disabled={!hasChanges || isSaving}
        onClick={onSave}
        className={cn(
          "rounded-xl px-8 h-10 font-black text-[11px] uppercase tracking-widest transition-all active:scale-95",
          hasChanges ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" : "bg-slate-50 text-slate-300 border border-slate-100"
        )}
      >
        <Save className={cn("h-4 w-4 mr-2", isSaving && "animate-pulse")} />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}