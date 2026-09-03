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
      width={25}
      height={25}
      className=""
      alt=""
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
    { title: "Understanding Your Business First", text:"Before developing an SEO roadmap, we analyze your product margins, customer acquisition model, and growth objectives to ensure organic search supports your overall business strategy." },
    { title: "Researching Your Market & Competitors", text:"We evaluate competitor visibility, search demand trends, and ranking opportunities to identify the areas where your brand can gain a sustainable advantage." },
    { title: "Aligning SEO With Real Business KPIs", text:"We focus on measurable outcomes such as qualified traffic, conversions, and revenue—not vanity metrics like impressions or keyword counts." },
    { title: "Building a Scalable SEO Roadmap", text:"SEO success requires consistency and iteration. We develop and execute structured roadmaps that evolve as search trends and algorithms change." },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        WHY BRANDS CHOOSE PERFOMAD FOR SEO <br />
        <span className="text-primary">Don’t leave organic growth to chance. Work with a performance-focused SEO partner.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
