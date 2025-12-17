import OrderNotFound from "@/components/orders/OrderNotFount";
import OrderError from "@/components/orders/OrderNotFount";
import OrderSuccess from "@/components/orders/OrderSuccess";
import { cookies } from "next/headers";

interface OrderSuccessPageProps {
  params: {
    id: string; 
  };
}

async function getOrderData(orderId: string) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('session_token')?.value;


  try {
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Cookie': cookiesStore.toString(),
      },
      cache: 'no-store', 
    });
    console.log("res from success page ", res)

    if (res.status === 404) {
      return { status: 404, order: null };
    }
    
    if (!res.ok) {
       
        console.error("API error status:", res.status);
        return { status: res.status, order: null };
    }

    const data = await res.json();
    
    if (data?.order?.ID) {
        return { status: 200, order: data.order };
    } else {
        
        return { status: 404, order: null }; 
    }

  } catch (error) {
    console.error("Network or Fetch Error:", error);
    return { status: 500, order: null, error: "Network error occurred." };
  }
}

export default async function OrderSuccessPage({params}: OrderSuccessPageProps) {

   const resolveParams = await params;
   const orderId = resolveParams.id;
 
    const {status, order, error} = await getOrderData(orderId);

    if (status === 404 || !order) {
        return <OrderNotFound message={orderId} />;
    }

    if (status !== 200) {
        return <OrderError message={error} />;
    }
    console.log("order from success page", order);
    return <OrderSuccess order={order} />;
}