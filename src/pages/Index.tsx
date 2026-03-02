import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import TransformationSection from "@/components/home/TransformationSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <ServicesPreview />
      <AboutPreview />
      <TransformationSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default Index;
