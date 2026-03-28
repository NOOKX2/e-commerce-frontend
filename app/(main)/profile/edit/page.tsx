import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/auth";
import EditProfileForm from "@/app/(main)/profile/_components/EditProfileForm";

export const metadata: Metadata = {
  title: "Edit profile",
};

export default async function EditProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?callbackUrl=/profile/edit");
  }

  return <EditProfileForm initialUser={user} />;
}
