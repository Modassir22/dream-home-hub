import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturedPlotsSection } from "@/components/home/FeaturedPlotsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <FeaturedPlotsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
