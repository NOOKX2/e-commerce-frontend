import { notFound } from "next/navigation";
import { AdminUser } from "@/types/user";
import UserDetailClient from "./_components/UserDetailClient";
import { cookies } from "next/headers";

// ดึงข้อมูล User ด้วย ID จาก API 
async function getUserByID(id: string): Promise<AdminUser | null> {
  const cookiesStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/users/${id}`, {
      cache: "no-store", 
      headers: {
        'Cookie': cookiesStore.toString(),
      },
    });

    if (!res.ok) {
        console.log(res);
      console.error("API Error:", res.status);
      return null;
    }
    
    const data = await res.json();
    return data.data; 
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const user = await getUserByID(id);

  if (!user) {
    notFound(); 
  }

  return (
    <div className="p-4 md:p-8">
      <UserDetailClient initialUser={user} />
    </div>
  );
}