import {
  Hero,
  OrderBanner,
  ProductShowcase,
  StatsBar,
  ValueBar,
  WhyUs,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProductShowcase />
      <WhyUs />
      <OrderBanner />
      <ValueBar />
    </>
  );
}
