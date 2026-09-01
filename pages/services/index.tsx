"use client";
import HeroSection from "../../components/services/HeroSection";
import OurSevices from "../../components/services/OurServices";
import SEOContentI from "../../components/services/SEOContentI";
import BusinessUnderstanding from "../../components/services/BusinessUnderstanding";
import WhatWeDontDo from "../../components/services/WhatWeDontDo";
import Content from "../../components/services/Content";
import FAQSection from "@/components/services/FAQSection";


export default function ComingSoon() {
  return (
    <div className="bg-background">
      <HeroSection />
      <OurSevices />
      <SEOContentI />
      <BusinessUnderstanding />
      <WhatWeDontDo />
      <Content/>
      <FAQSection faqs={[]}/>
    </div>
  );
}
