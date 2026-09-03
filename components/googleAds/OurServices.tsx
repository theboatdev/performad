import Image from "next/image";


type Service = {
  title: string;
  CardImage:string;
  description: string;
  CardSize:string;
};

const services: Service[] = [
  { title: "Google Search Ads",CardImage:"/googleAds/Google Search Ads.jpg", description: "Capture high-intent customers exactly when they’re ready to buy. We build tightly structured Search campaigns that focus on purchase-driven keywords, smart bidding strategies, and continuous optimization to maximize ROAS while controlling CPA.",CardSize:"m" },
  { title: "Google Shopping Ads",CardImage:"/googleAds/Google Shopping Ads.jpg", description: "Turn product searches into revenue. We optimize product feeds, titles, images, and bidding strategies to ensure your products appear competitively across Google Shopping—driving qualified traffic with clear buying intent.",CardSize:"m" },
  { title: "Google Display & YouTube Ads",CardImage:"/googleAds/Google Display Ads.jpg", description: "Scale awareness and retargeting with precision. From dynamic remarketing to YouTube video campaigns, we use Display and YouTube to support your funnel—bringing users back and increasing assisted conversions.",CardSize:"m" },
  { title: "Performance Max & Demand Gen Ads",CardImage:"/googleAds/Performance Max and Demand Gen Ads.jpg", description: "Unlock Google’s full ecosystem with structured, data-driven automation. We build Performance Max and Demand Gen campaigns with proper asset grouping, audience layering, and conversion signals—so automation works for you, not against you.",CardSize:"m" },
  { title: "Conversion Tracking for Google Ads",CardImage:"/googleAds/Conversion Tracking & ROI Reporting.jpg", description: "No tracking, no truth. We implement accurate conversion tracking using GA4, Google Ads tags, enhanced conversions, and server-side setups—so every optimization decision is backed by real data.",CardSize:"m" },
  { title: "Landing Page Development & Optimization",CardImage:"/RectangleHero.png", description: "Ads don’t fail—landing pages do. We design and optimize landing pages that align with search intent, improve Quality Score, and increase conversion rates across all Google Ads traffic.",CardSize:"m" },
];

export default function OurSevices() {
  return (
    <section className="bg-secondary py-12 px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">What We Do</h2>
        {/* <p className="text-gray-600 mt-2">I’m a paragraph. Click here to add your own text and edit me.</p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto pb-6">
        {services.map((service, i) =>
          service.CardSize === 'm' && (
            <div key={i} className="bg-white rounded-lg pb-6 shadow hover:shadow-lg transition">
              <div className="relative w-full h-60 rounded-lg"> 
                <Image unoptimized
                  src={service.CardImage}
                  alt="About us"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 pl-6 pr-6 pt-4">{service.title}</h3>
              <p className="text-gray-600 text-base pl-6 pr-6">{service.description}</p>
            </div>
          )
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {services.map((service, i) =>
          service.CardSize === 'l' && (
            <div key={i} className="bg-white  rounded-lg pb-6 shadow hover:shadow-lg transition col-span-2">
              <div className="relative w-full h-60 rounded-lg"> 
                <Image unoptimized
                  src={service.CardImage} 
                  alt="About us"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 pl-6 pr-6 pt-4">{service.title}</h3>
              <p className="text-gray-600 text-base pl-6 pr-6">{service.description}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};


