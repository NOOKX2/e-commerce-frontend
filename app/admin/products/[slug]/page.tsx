import { notFound } from "next/navigation";
import { AdminProduct } from "@/types/product";
import ProductDetailClient from "./_components/ProductDetailClient";
import { cookies } from "next/headers";

// ดึงข้อมูลสินค้าด้วย slug จาก API ของคุณ
async function getProductBySlug(slug: string): Promise<AdminProduct | null> {
  const cookiesStore = await cookies();
  try {
    // 🚨 จุดแก้ที่ 1: เพิ่ม /slug/ เข้าไปใน URL ให้ตรงกับ Route ของ Go
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/admin/products/${slug}`, {
      cache: "no-store", 
      headers: {
        'Cookie': cookiesStore.toString(),
      },
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return null;
    }
    
    const data = await res.json();
    
    // 🚨 จุดแก้ที่ 2: เปลี่ยนจาก data.product เป็น data.data 
    // เพราะ Go ของคุณตอบกลับมาเป็น {"success": true, "data": {...}}
    return data.data; 
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// 🚨 จุดแก้ที่ 3: ปรับ Type ของ params ให้เป็น Promise
export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) {
  // 🚨 ทำการ await params ก่อนดึงค่า slug ออกมาใช้งาน
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound(); // ถ้าไม่เจอสินค้า ให้โยนไปหน้า 404
  }

  return (
    <div className="p-4 md:p-8">
      <ProductDetailClient initialProduct={product} />
    </div>
  );
}