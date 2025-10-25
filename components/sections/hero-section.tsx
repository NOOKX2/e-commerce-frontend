import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image";
import heroBackgroundImage from "@/public/images/hero-background.jpeg";


function HeroSection() {
  return (
    <section className="relative w-full h-[600px]">
      <Image
        src={heroBackgroundImage}
        alt="A modern workspace with Apple products on a desk"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5">
        <h2 className="text-sm font-bold">ULTIMATE E-COMMERCE SHOP</h2>
        <Link href="/products"><Button variant='default' size='lg'>Shop Now</Button></Link>
        <h1 className="text-4xl md:text-6xl font-black leading-tight">End of Season Sale - Up to 70% Off!</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl ">Discover the latest trends for this summer.</p>
      </div>
    </section>
  )
}
export default HeroSection