import {
  BrandIntro,
  DualBanners,
  FeaturedPicks,
  Hero,
  ImpactStrip,
  OrderBanner,
  OurStory,
  ProductShowcase,
  QualitiesBar,
  QualitySection,
  RetailExport,
  SourceToPack,
  TrustBar,
  WaysToUse,
  WhyPrimeweaves,
} from "@/components/home/sections";
import { HowItsMade } from "@/components/home/HowItsMade";
import { FaqSection } from "@/components/home/Faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QualitiesBar />
      <BrandIntro />
      <FeaturedPicks />
      <DualBanners />
      <ImpactStrip />
      <TrustBar />
      <ProductShowcase />
      <HowItsMade />
      <SourceToPack />
      <WhyPrimeweaves />
      <QualitySection />
      <WaysToUse />
      <OurStory />
      <RetailExport />
      <FaqSection />
      <OrderBanner />
    </>
  );
}
