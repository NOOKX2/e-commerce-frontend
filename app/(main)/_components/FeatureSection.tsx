import { Truck, Clock, Lock} from 'lucide-react';

function FeatureSection() {
  return (
    <div className="flex justify-center gap-10">
        <div className="flex flex-col items-center gap-5">
            <h2 className='text-xl'>Free Shipping</h2>
            <Truck className='h-8 w-8 text'/>
        </div>
        <div className="flex flex-col items-center gap-5">
            <h2 className='text-xl'>24/7 Customer Support</h2>
            <Clock className='h-8 w-8'/>
        </div>
        <div className="flex flex-col items-center gap-5">
            <h2 className='text-xl'>Secure Payments</h2>
            <Lock className='h-8 w-8'/>
        </div>
    </div>
  )
}
export default FeatureSection