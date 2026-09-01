import ServiceCard from "./ServiceCard";

interface Service { title: string; description: string; link: string; }
interface Props { services: Service[]; }

const FALLBACK = [
  { title: "Marketplace Management", description: "We help brands grow and scale on online marketplaces through strategic product optimization and data-driven management. Our team handles listings, performance monitoring, and growth strategies.", link: "#" },
  { title: "Social Media Advertising", description: "Reach and convert your ideal audience through highly targeted advertising. Our performance-driven campaigns are designed to help your business grow.", link: "#" },
  { title: "PPC Advertising", description: "Drive immediate, measurable traffic with expertly managed Pay-Per-Click campaigns. Our approach focuses on data analysis, strategic bidding, and continuous optimization to maximize ROI and reduce wasted ad spend.", link: "#" },
  { title: "Search Engine Optimization", description: "Improve your website’s visibility on search engines through technical optimization, keyword strategy, and authority building. Our SEO strategies are designed to increase organic traffic, strengthen search rankings, and generate long-term growth.", link: "#" },
  { title: "Web Design and Development", description: "Build high-performing, modern websites that combine strong design with seamless functionality. We create responsive, conversion-focused websites tailored to support your brand’s digital growth and user experience.", link: "#" },
];

export default function Services({ services }: Props) {
  const list = services.length > 0 ? services : FALLBACK;
  return (
    <>
      <div>
        <h1 className="text-4xl md:text-5xl font-bold">We Are Offering Many</h1>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
      </div>
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} link={service.link} image="/ServiceCard.png" />
          ))}
        </div>
      </section>
    </>
  );
}