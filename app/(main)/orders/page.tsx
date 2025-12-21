import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrderList from "@/components/orders/OrderList";

async function getUserOrders() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/orders/`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": allCookies,
      },
      cache: "no-store", 
    });
    const data = await res.json();

    if (res.status === 401) {
      return { error: "Unauthorized", status: 401 };
    }

    if (!res.ok) {
      console.error("Fetch orders failed:", res.status);
      return { error: "Failed to fetch orders", status: res.status };
    }

   
    return { orders: data.orders || [], status: 200 };

  }catch(error: any) {
    console.error("Network error:", error);
    return { error: "Network Error", status: 500 };
  }
}

async function OrderPage() {
  const { orders, error, status } = await getUserOrders();
  if (status === 401) {
    redirect("/login?callbackUrl=/orders");
  }

  if (error || !orders) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error Loading Orders</h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }
  return (
    <OrderList orders={orders}/>
  );
}

export default OrderPage;
