import HeroSection from "../../components/aboutUs/HeroSection";
import Services from "../../components/aboutUs/Services";
import StatSection from "../../components/aboutUs/StatSection";
import Content from "../../components/aboutUs/Content";
import CoreValues from "../../components/aboutUs/CoreValues";

export default function AboutUsPage() {
  return (
    <main className="flex flex-col items-center justify-center pl-6 md:pl-0 pr-6 md:pr-0 text-center bg-background">
      <HeroSection />
      <Services services={[]} />
      <StatSection stats={[]} />
      <Content />
      <CoreValues coreValues={[]} />
    </main>
  );
}
