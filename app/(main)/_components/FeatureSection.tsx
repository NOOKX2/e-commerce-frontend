import { Truck, Clock, Lock} from 'lucide-react';

function FeatureSection() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <div className="glass-card flex flex-col items-center gap-3 px-6 py-6 text-center">
            <Truck className='h-6 w-6 text-neutral-700'/>
            <h2 className='text-lg font-semibold'>Free Shipping</h2>
            <p className="text-sm text-muted-foreground">On all orders over ฿1,000</p>
        </div>
        <div className="glass-card flex flex-col items-center gap-3 px-6 py-6 text-center">
            <Clock className='h-6 w-6 text-neutral-700'/>
            <h2 className='text-lg font-semibold'>24/7 Support</h2>
            <p className="text-sm text-muted-foreground">Real people ready to help</p>
        </div>
        <div className="glass-card flex flex-col items-center gap-3 px-6 py-6 text-center">
            <Lock className='h-6 w-6 text-neutral-700'/>
            <h2 className='text-lg font-semibold'>Secure Payments</h2>
            <p className="text-sm text-muted-foreground">Trusted and encrypted checkout</p>
        </div>
    </section>
  )
}
export default FeatureSection