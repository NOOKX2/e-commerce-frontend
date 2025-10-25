import FeatureSection from "@/components/sections/feature-section";
import HeroSection from "@/components/sections/hero-section";
import Image from "next/image";

export default function Home() {
  return (
   <div className="flex flex-col gap-15">
    <HeroSection />
    <FeatureSection />
   </div>
  );
}
