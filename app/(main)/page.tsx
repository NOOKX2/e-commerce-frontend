import FeatureProduct from "@/app/(main)/_components/FeatureProduct";
import FeatureSection from "@/app/(main)/_components/FeatureSection";
import HeroSection from "@/app/(main)/_components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <HeroSection />
      <FeatureSection />
      <FeatureProduct />
    </div>
  );
}
