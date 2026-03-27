export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Admin configuration and platform-level preferences.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
        <p className="text-sm text-gray-600">
          Settings module scaffold is ready. Add payment, moderation, notification, and policy controls here.
        </p>
      </div>
    </div>
  );
}

