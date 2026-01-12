import { MapPin } from 'lucide-react'; 
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Order } from '@/types/order';
import OrderSummaryInOrderSuccess from './OrderSummaryInOrderSuccess';
import { Button } from '../ui/button';
import Link from 'next/link';
interface Props {
  order: Order;
}


export default function OrderInformation({ order }: Props) {
  console.log("order in order information", order);
  const address = order.shippingAddress
  return (
    <section className='space-y-4'>
    <Card className="flex justify-center shadow-sm text-left">
      {/* Header */}
      <CardHeader className='pb-0'>
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-primary my">
          <MapPin className="h-5 w-5 " /> 
          <p>Shipping Address</p>
        </CardTitle>
      </CardHeader>

      <Separator className="mb-2" />

      {/* Body */}
      <CardContent className="grid grid-cols-[140px_1fr] gap-y-2 text-sm ">

        <p className='font-bold'>Receiver Name</p>
        <span className="text-foreground">
          {address.receiverName}
        </span>

        <p className='font-bold'>Phone Number</p>
        <span className="text-foreground">
          {address.phoneNumber}
        </span>


        <p className='font-bold'>Street Address</p>
        <span className="text-foreground">
          {address.streetAddress}
        </span>

        <p className='font-bold'>Sub District</p>
        <span className="text-foreground">
          {address.subDistrict}
        </span>


        <p className='font-bold'>District</p>
        <span className="text-foreground">
          {address.district}
        </span>


        <p className='font-bold'>Province</p>
        <span className="text-foreground">
          {address.province}
        </span>

        <p className='font-bold'>Postcal Code</p>
        <span className="text-foreground">
          {address.postalCode}
        </span>

      </CardContent>
      <OrderSummaryInOrderSuccess items={order.items} />
      
    </Card>
    <div className="flex flex-col mt-2 gap-2">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
         <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}