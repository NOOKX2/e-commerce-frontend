import Link from "next/link"
import { Button } from "../../../components/ui/button"
import Image from "next/image";
import heroBackgroundImage from "@/public/images/hero-background.jpeg";


function HeroSection() {
  return (
    <section className="relative h-105 w-full overflow-hidden rounded-3xl border border-black/5 shadow-sm md:h-130">
      <Image
        src={heroBackgroundImage}
        alt="A modern workspace with Apple products on a desk"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center md:gap-6">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-white/90 md:text-sm">ULTIMATE E-COMMERCE SHOP</h2>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
          End of Season Sale - Up to 70% Off
        </h1>
        <p className="max-w-2xl text-sm text-white/85 md:text-lg">
          Discover premium essentials and the latest tech picks for your next setup.
        </p>
        <Link href="/products">
          <Button variant='secondary' size='lg' className="rounded-full bg-white/90 px-8 text-neutral-900 hover:bg-white">
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
export default HeroSection