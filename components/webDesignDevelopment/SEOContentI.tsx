
export default function SeoContentI() {
  const features = [
    {
      icon:"/coreValues/balance.png",
      title: "Scalable Architecture",
      description:
        "We design websites with long-term growth in mind, ensuring the platform can support increasing traffic, product catalogs, and integrations.",
    },
    {
      icon:"/coreValues/balance.png",
      title: "Conversion-Focused Design",
      description:
        "Our development process aligns closely with marketing and customer behavior insights, ensuring every design decision supports conversion performance.",
    },
    {
      icon:"/coreValues/balance.png",
      title: "Reliable Performance Monitoring",
      description:
        "From uptime monitoring to performance tracking, we ensure your website consistently delivers a fast and reliable experience for your customers.",
    },
    
  ];

  return (
    <section className="bg-primary py-12 px-6 text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          <span className="text-black pr-4">
          WHY SHOULD YOU  
          </span>
          <span>
          WORK WITH A MARTECH AGENCY??
          </span>
        </h2>
        <p className="mt-2 text-black">
          Global development standards. Local expertise. Long-term reliability.<br/>
          <span className="text-white">
            We approach development as a strategic investment, not just a technical project. Our focus is on building scalable platforms that support your marketing, operations, and customer experience.
          </span>
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className="relative border rounded-lg p-6 bg-white text-gray-900 shadow hover:shadow-md transition overflow-hidden min-h-72 h-72"
          >
            {/* Oval shape in corner */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/25 rounded-full"></div>

            {/* Icon box */}
            <div className="w-12 h-12 bg-teal-100 rounded flex items-center justify-center mb-4 relative z-10">
              <img src={feature.icon} alt={feature.title} />
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg relative z-10">{feature.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-2 relative z-10">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
