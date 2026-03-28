import { cookies } from "next/headers";
import WorkspacePageHeader from "@/components/dashboard/WorkspacePageHeader";
import AdminSettingsClient from "./_components/AdminSettingsClient";
import { PlatformSettings } from "@/types/settings";

async function getPlatformSettings(): Promise<PlatformSettings | null> {
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/settings/platform`, {
      cache: "no-store",
      headers: { Cookie: cookieStore.toString() },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as PlatformSettings;
  } catch {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const data = await getPlatformSettings();

  if (!data) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-sm text-red-800">
        Could not load platform settings. Check that you are signed in as an admin.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WorkspacePageHeader
        title="Settings"
        description="Platform configuration, finance, and moderation."
      />
      <AdminSettingsClient initialSettings={data} />
    </div>
  );
}
