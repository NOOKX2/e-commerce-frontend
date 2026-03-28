"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Save, User as UserIcon, Calendar, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AdminUser } from "@/types/user";
import { cn } from "@/lib/utils";

export default function UserDetailClient({ initialUser }: { initialUser: AdminUser }) {
    const router = useRouter();
    const [user, setUser] = useState<AdminUser>(initialUser);
    const [isSaving, setIsSaving] = useState(false);

    // เช็คว่ามีการแก้ไขข้อมูลหรือไม่
    const hasChanges = useMemo(() => {
        return JSON.stringify(user) !== JSON.stringify(initialUser);
    }, [user, initialUser]);

    const handleChange = (field: keyof AdminUser, value: any) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // ยิง API ไปอัปเดตข้อมูล User (คุณอาจจะต้องสร้าง Endpoint PUT /v1/admin/users/:id เพิ่มใน Go)
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/admin/users/${user.ID}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: user.name,
                    role: user.role,
                    status: user.status
                }),
            });

            if (!res.ok) { 
                console.log(res);
                throw new Error("Failed to update user");
             }

            toast.success("User updated successfully!");
            router.refresh();
        } catch (error) {
            toast.error("Failed to update user");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">

            {/* 1. Sticky Action Bar */}
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
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">ID: #{user.ID}</p>
                    </div>
                </div>

                <Button
                    disabled={!hasChanges || isSaving}
                    onClick={handleSave}
                    className={cn(
                        "rounded-xl px-8 h-10 font-black text-[11px] uppercase tracking-widest transition-all active:scale-95",
                        hasChanges
                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                            : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                    )}
                >
                    <Save className={cn("h-4 w-4 mr-2", isSaving && "animate-pulse")} />
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            {/* 2. Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Personal Info) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-50">
                                <UserIcon className="h-8 w-8 text-slate-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900">{initialUser.name}</h2>
                                <p className="text-sm font-medium text-slate-500">{initialUser.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                <Input
                                    value={user.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4 font-semibold text-slate-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        value={user.email}
                                        disabled
                                        className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-10 text-slate-500 font-medium cursor-not-allowed"
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 ml-1 mt-1">Email cannot be changed by the administrator.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Access & Status) */}
                <div className="space-y-6">

                    {/* Role Card */}
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-50 pb-4">Access Control</h2>
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">User Role</Label>
                            <Select value={user.role} onValueChange={(val) => handleChange("role", val)}>
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
                            <Select value={user.status} onValueChange={(val) => handleChange("status", val)}>
                                <SelectTrigger className={cn(
                                    "h-12 rounded-2xl border-slate-100 font-black uppercase text-xs",
                                    user.status === 'banned' ? "bg-red-50 text-red-600" : "bg-slate-50/50"
                                )}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["active", "suspended", "banned"].map((s) => (
                                        <SelectItem key={s} value={s} className="text-[11px] font-bold uppercase">
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-slate-50 p-6 rounded-4xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3 text-slate-500">
                            <Calendar className="h-4 w-4" />
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest">Joined Date</p>
                                <p className="text-xs font-semibold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : "Unknown"}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}