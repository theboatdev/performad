import Image from "next/image";


type Service = {
  title: string;
  CardImage:string;
  description: string;
  CardSize:string;
};

const services: Service[] = [
  { title: "Platform Setup & Migration",CardImage:"/webDesign/Platform Setup & Migration.jpg", description: "Whether launching a new store or migrating from an existing platform, we ensure a smooth and secure transition. Our team handles data migration, platform configuration, SEO preservation, and performance optimization to minimize disruption and protect your search visibility.",CardSize:"m" },
  { title: "UI/UX & Responsive Design",CardImage:"/webDesign/UI_UX & Responsive Design.jpg", description: "A great website experience directly impacts conversion rates. We design intuitive, user-focused interfaces that guide visitors through the buying journey while ensuring seamless performance across desktop, tablet, and mobile devices.",CardSize:"m" },
  { title: "Custom Feature Development",CardImage:"/webDesign/Custom Feature Development.jpg", description: "Every business has unique operational needs. We develop custom functionality tailored to your workflows, from advanced product filtering and checkout features to customer portals and automation tools that enhance user experience.",CardSize:"m" },
  { title: "API & Third-Party Integrations",CardImage:"/webDesign/API & Third-Party Integrations.jpg", description: "Modern businesses rely on connected systems. We integrate your website with essential platforms such as payment gateways, CRMs, inventory systems, shipping tools, marketing platforms, and analytics systems to streamline operations.",CardSize:"l" },
  { title: "Performance & Security Maintenance",CardImage:"/webDesign/Performance & Security Maintenance.jpg", description: "Website performance and security are critical for both user experience and business continuity. We implement continuous monitoring, speed optimization, security hardening, and regular updates to keep your platform running reliably.",CardSize:"l" },
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
                <Image
                  src={service.CardImage}
                  alt="About us"
                  layout="fill"
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
                <Image
                  src={service.CardImage} 
                  alt="About us"
                  layout="fill"
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


