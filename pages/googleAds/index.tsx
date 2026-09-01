"use client";
import BrandsSection from "../../components/googleAds/BrandsSection";
import ReviewsInGoodleAdsPage from "../../components/googleAds/ReviewsInGoodleAdsPage";
import WorkflowSection from "../../components/googleAds/WorkflowSection";
import GoogleAdsSection from "../../components/googleAds/GoogleAdsSection";
import HeroSection from "@/components/googleAds/HeroSection";
import OurSevices from "@/components/googleAds/OurServices";
import SeoContentI from "@/components/googleAds/SEOContentI";
import BusinessUnderstanding from "@/components/googleAds/BusinessUnderstanding";
import WhatWeDontDo from "@/components/googleAds/WhatWeDontDo";
import Content from "@/components/services/Content";
import FAQSection from "@/components/googleAds/FAQSection";

const stepsData = [
  {
    title: "Analysis And Strategy",
    description:
      "The first we do is a thorough analysis followed by a deep dive in your unit economics. With a part of the team we combine the insights and the data and build a custom strategy that fits our framework.",
  },
  {
    title: "Optimizing Ad Strategy",
    description:
      "After the new strategy has been discussed, we build all possible campaigns you’re going to need in the near future (including awareness and retargeting). We optimize the campaigns on set times during the process.",
  },
  {
    title: "Automation And Hand–Over",
    description:
      "Time to add our scripts and write custom scripts. For webshop we build automations so your best- and sale items have maximum visibility. When we’re done we hand it back over to you. Of course you can keep working with us.",
  },
];

export default function googleAds() {
  return (
    <div className="bg-background">
        {/* <GoogleAdsSection
          tag="Google Ads Marketing"
          title="Boost Your Business Growth With"
          highlight="Google Ads"
          description="I'm a Paragraph. Click Here To Add Your Own Text And Edit Me. It's Easy. Just Click 'Edit Text' Or Double Click Me To Add Your Own Content And Make Changes To The Font."
          buttonText="Lets Talk"
          imageSrc=""
        />
        <WorkflowSection steps={stepsData} />
        <BrandsSection/>
        <ReviewsInGoodleAdsPage/>
        <FAQSection faqs={[]}/> */}
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
