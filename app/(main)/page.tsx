import FeatureProduct from "@/components/sections/feature-product";
import FeatureSection from "@/components/sections/feature-section";
import HeroSection from "@/components/sections/hero-section";

export default function Home() {
  return (
   <div className="flex flex-col gap-15">
    <HeroSection />
    <FeatureSection />
    <FeatureProduct />
   </div>
  );
}
