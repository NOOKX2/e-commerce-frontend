import FeatureProduct from "@/components/sections/FeatureProduct";
import FeatureSection from "@/components/sections/FeatureSection";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
   <div className="flex flex-col gap-15">
    <HeroSection />
    <FeatureSection />
    <FeatureProduct />
   </div>
  );
}
