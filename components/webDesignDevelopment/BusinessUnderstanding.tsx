import Image from "next/image";
import { FC } from "react";

interface CardProps {
  title: string;
  text: string;
}

const Icon = () => (
  <div className="bg-primary rounded-lg px-2 items-center">
    <Image unoptimized
      src={'/icon.png'}
      width={"25px"}
      height={"25px"}
      className=""
    />
  </div>
);

const Card: FC<CardProps> = ({ title, text }) => (
  <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 border border-primary">
    <div className="flex items-start gap-2">
      <Icon />
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg pb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  </div>
);

export default function BusinessUnderstanding() {

  // Data array for cards
  const cards: CardProps[] = [
    { title: "Understanding Your Business First", text:"We begin by understanding your products, customers, operational workflows, and growth goals to ensure the website architecture aligns with your business model." },
    { title: "Researching Your Market & Competitors", text:"We evaluate competitor websites, customer expectations, and industry best practices to design platforms that stand out while maintaining usability." },
    { title: "Aligning Development With Business KPIs", text:"Our development decisions consider metrics such as conversion rate, page speed, SEO performance, and scalability to ensure your website supports real growth." },
    { title: "Building a Scalable Roadmap", text:"Beyond launch, we help plan future upgrades, feature development, and performance improvements so your website evolves alongside your business." },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        WHY BRANDS CHOOSE PERFOMAD FOR WEBSITE DEVELOPMENT<br />
        <span className="text-primary"> Don’t leave your digital infrastructure to chance. Work with a development partner focused on performance.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
