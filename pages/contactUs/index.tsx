import ContactSection from "../../components/contactUs/ContactSection";
import HeroSection from "../../components/contactUs/HeroSection";
import FAQSection from "../../components/contactUs/FAQSection";

export default function ContactUsPage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <ContactSection />
      <FAQSection faqs={[]} />
    </div>
  );
}
