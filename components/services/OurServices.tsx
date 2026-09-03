import Image from "next/image";


type Service = {
  title: string;
  CardImage:string;
  description: string;
  CardSize:string;
};

const services: Service[] = [
  { title: "Technical SEO & Site Architecture",CardImage:"/seo/Technical SEO & Site Architecture.jpg", description: "A strong SEO strategy starts with the right technical foundation. We audit and optimize your site architecture, crawlability, indexation, page speed, and structured data to ensure search engines can properly discover, understand, and rank your pages.",CardSize:"m" },
  { title: "On-Page & Product/Category Optimization",CardImage:"/seo/On-Page & Product_Category Optimization.jpg", description: "Search engines reward relevance. We optimize product pages, category pages, metadata, internal linking, and content structure to improve keyword visibility while ensuring pages are designed to convert visitors into customers.",CardSize:"m" },
  { title: "Keyword & Competitor Research",CardImage:"/seo/Keyword & Competitor Research.jpg", description: "Winning SEO strategies start with deep market insight. We analyze search demand, competitor rankings, keyword gaps, and customer intent to build a roadmap that targets the most valuable opportunities in your category.",CardSize:"m" },
  { title: "Authority Building",CardImage:"/seo/Authority Building.jpg", description: "Search engines trust websites that demonstrate authority. Through strategic link acquisition, content partnerships, and brand signals, we strengthen your domain authority and improve ranking potential across competitive keywords.",CardSize:"l" },
  { title: "Conversion Tracking & ROI Reporting",CardImage:"/seo/Conversion Tracking & ROI Reporting.jpg", description: "Traffic without measurable impact is meaningless. We implement advanced tracking to connect SEO performance directly to revenue, helping you understand how organic search contributes to real business growth.",CardSize:"l" },
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


