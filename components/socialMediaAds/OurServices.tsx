import Image from "next/image";


type Service = {
  title: string;
  CardImage:string;
  description: string;
  CardSize:string;
};

const services: Service[] = [
  { title: "360 Social Media Advertising Strategy",CardImage:"/socialMedia/360 Social Media Advertising Strategy.jpg", description: "We don’t run ads in isolation. We build full-funnel paid social strategies aligned to your business goals—mapping awareness, consideration, and conversion campaigns into one cohesive growth system.",CardSize:"m" },
  { title: "Advertising Content Strategy",CardImage:"/socialMedia/Advertising Content Strategy.jpg", description: "Creative is the biggest performance lever in paid social. We develop content frameworks tailored to platform behavior, audience intent, and funnel stage—your ads then resonate, stop the scroll, and convert.",CardSize:"m" },
  { title: "Audience A/B Testing",CardImage:"/socialMedia/Audience A_B Testing.jpg", description: "Assumptions kill performance. We test audiences, creatives, formats, and messaging continuously—using structured A/B testing to identify what truly drives conversions at scale",CardSize:"m" },
  { title: "Advertising Tracking Setup",CardImage:"/socialMedia/Advertising Tracking Setup.jpg", description: "If tracking is broken, everything else is noise. We implement accurate tracking across platforms using pixels, conversion APIs, event mapping, and attribution alignment—performance decisions are based on real data.",CardSize:"l" },
  { title: "Comprehensive Analysis & Data Reporting",CardImage:"/socialMedia/Comprehensive Analysis & Data Reporting.jpg", description: "Data without insight is useless. We analyze performance across creatives, audiences, and funnel stages—translating numbers into clear actions that improve ROAS and scalability.",CardSize:"l" },
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


