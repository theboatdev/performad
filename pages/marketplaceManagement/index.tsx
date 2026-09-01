"use client";
import MarketplaceManagementSection from "../../components/marketplaceManagement/MarketplaceManagementSection";
import ReviewsInMarketplaceManagementPage from "../../components/marketplaceManagement/ReviewsInMarketplaceManagementPage";
import WorkflowSection from "../../components/marketplaceManagement/WorkflowSection";
import BrandsSection from "../../components/marketplaceManagement/BrandsSection";
import HeroSection from "@/components/marketplaceManagement/HeroSection";
import OurSevices from "@/components/marketplaceManagement/OurServices";
import SeoContentI from "@/components/marketplaceManagement/SEOContentI";
import BusinessUnderstanding from "@/components/marketplaceManagement/BusinessUnderstanding";
import WhatWeDontDo from "@/components/marketplaceManagement/WhatWeDontDo";
import Content from "@/components/marketplaceManagement/Content";
import FAQSection from "@/components/marketplaceManagement/FAQSection";

const stepsData = [
    {
        title: "Audit & Strategy",
        description:
            "We analyze your current marketplace presence and identify growth opportunities to build a custom roadmap for your brand.",
    },
    {
        title: "Optimization & Launch",
        description:
            "We overhaul your product listings with SEO-rich content, A+ content, and high-quality visuals to maximize conversion rates.",
    },
    {
        title: "Scale & Manage",
        description:
            "We handle day-to-day operations, including inventory forecasting and price optimization, while scaling your brand globally.",
    },
];

export default function MarketplaceManagement() {
    return (
        <div className="bg-background">
            {/* <MarketplaceManagementSection
                tag="Marketplace Management"
                title="Dominate the Digital Shelf with Strategic"
                highlight="Marketplace Management"
                description="Elevate your brand across Amazon, eBay, and beyond. We optimize your listings, manage your inventory, and drive sales through data-driven marketplace strategies."
                buttonText="Get Started"
                imageSrc=""
            />
            <WorkflowSection steps={stepsData} />
            <BrandsSection />
            <ReviewsInMarketplaceManagementPage />
            <FAQSection /> */}
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
