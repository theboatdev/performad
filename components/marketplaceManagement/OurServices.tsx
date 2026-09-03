import Image from "next/image";


type Service = {
  title: string;
  CardImage:string;
  description: string;
  CardSize:string;
};

const services: Service[] = [
  { title: "Marketplace Account Management",CardImage:"/marketplace/Marketplace Account Management.jpg", description: "Your Marketplace account is treated like a business not a dashboard. We handle daily operations, compliance, performance monitoring and execution to ensure your account runs smoothly, stays protected, and scales sustainably.",CardSize:"m" },
  { title: "Product Listing Optimization",CardImage:"/marketplace/Product Listing Optimization.jpg", description: "Visibility converts when done right. We optimize titles, bullet points, descriptions, backend keywords, and A+ content to improve rankings, click-through rates, and conversions aligned with real buyer intent.",CardSize:"m" },
  { title: "PPC Strategy & Management",CardImage:"/marketplace/PPC Strategy & Management.jpg", description: "Paid ads are only powerful when structured correctly. We build and manage data-driven PPC strategies focused on RoAS, TACoS(Total Advertising Cost of Sales) and Ad spend.",CardSize:"m" },
  { title: "Design & Enhanced Image Optimization",CardImage:"/marketplace/Design & Enhanced Image Optimization.jpg", description: "Your product visuals sell before your copy does. We provide product image guides and optimized A+/Enhanced Visual layouts to improve CTR, trust, and conversion rate while staying fully compliant with marketplace guidelines.",CardSize:"l" },
  { title: "Competitor & Marketplace Insights",CardImage:"/marketplace/Competitor & Marketplace Insights (1).jpg", description: "We don’t guess we analyze data. From competitor pricing and keyword positioning to category trends and demand shifts, we turn marketplace data into strategic advantages.",CardSize:"l" },
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


