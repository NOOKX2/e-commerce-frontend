"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ApiProfileResponse = {
  success?: boolean;
  error?: string;
  message?: string;
  response?: {
    ID?: number;
    id?: number;
    email?: string;
    name?: string;
    role?: string;
  };
};

function mapToUser(raw: NonNullable<ApiProfileResponse["response"]>): User {
  const id = raw.ID ?? raw.id;
  return {
    ID: id != null ? Number(id) : 0,
    email: raw.email ?? "",
    name: raw.name ?? "",
    role: raw.role ?? "buyer",
  };
}

export default function EditProfileForm({ initialUser }: { initialUser: User }) {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as ApiProfileResponse | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Could not update profile");
      }
      if (data?.response) {
        login(mapToUser(data.response));
      }
      toast.success("Profile saved");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-8">
      <Button variant="ghost" className="h-9 w-fit rounded-full px-0 font-medium text-neutral-600 hover:text-slate-900" asChild>
        <Link href="/profile" className="inline-flex items-center gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Edit profile</h1>
        <p className="mt-2 text-neutral-600">Update your display name and email.</p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="space-y-6 rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm sm:p-10"
      >
        <div className="space-y-2">
          <Label htmlFor="edit-name" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            Name
          </Label>
          <Input
            id="edit-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-4 transition-colors focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-email" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            Email
          </Label>
          <Input
            id="edit-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 px-4 transition-colors focus:bg-white"
          />
        </div>
        <p className="text-xs text-neutral-500">
          Role cannot be changed here. Contact support if you need a different account type.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="h-11 rounded-2xl border-neutral-200" asChild>
            <Link href="/profile">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="h-11 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Saving…
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
