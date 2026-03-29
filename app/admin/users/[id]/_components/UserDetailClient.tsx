"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/context/auth-context";
import { AdminUser } from "@/types/user";
import { UserHeader } from "./UserHeader";
import { UserPersonalInfoCard } from "./UserPersonalInfoCard";
import { UserAccessSidebar } from "./UserAccessSidebar";

export default function UserDetailClient({ initialUser }: { initialUser: AdminUser }) {
    const router = useRouter();
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<AdminUser>(initialUser);
    const [isSaving, setIsSaving] = useState(false);

    const isOwnAccount = authUser != null && authUser.ID === user.ID;

    const hasChanges = useMemo(() => {
        return JSON.stringify(user) !== JSON.stringify(initialUser);
    }, [user, initialUser]);

    const handleChange = (field: keyof AdminUser, value: any) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
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

            if (!res.ok) throw new Error("Failed to update user");

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
            <UserHeader 
                userId={user.ID} 
                hasChanges={hasChanges} 
                isSaving={isSaving} 
                onSave={handleSave} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <UserPersonalInfoCard 
                        initialName={initialUser.name}
                        currentName={user.name}
                        email={user.email}
                        onNameChange={(val) => handleChange("name", val)}
                    />
                </div>

                <div className="lg:col-span-1">
                    <UserAccessSidebar 
                        role={user.role}
                        status={user.status}
                        createdAt={user.createdAt}
                        onRoleChange={(val) => handleChange("role", val)}
                        onStatusChange={(val) => handleChange("status", val)}
                        statusSelectDisabled={isOwnAccount}
                    />
                </div>
            </div>
        </div>
    );
}