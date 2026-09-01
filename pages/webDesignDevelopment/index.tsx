"use client";

import BusinessUnderstanding from "@/components/webDesignDevelopment/BusinessUnderstanding";
import Content from "@/components/webDesignDevelopment/Content";
import FAQSection from "@/components/webDesignDevelopment/FAQSection";
import HeroSection from "@/components/webDesignDevelopment/HeroSection";
import OurSevices from "@/components/webDesignDevelopment/OurServices";
import SeoContentI from "@/components/webDesignDevelopment/SEOContentI";
import WhatWeDontDo from "@/components/webDesignDevelopment/WhatWeDontDo";

export default function ComingSoon() {
  return (
    <div className="bg-background">
      <HeroSection />
      <OurSevices />
      <SeoContentI />
      <BusinessUnderstanding />
      <WhatWeDontDo />
      <Content/>
      <FAQSection faqs={[]}/>
    </div>
  );
}
