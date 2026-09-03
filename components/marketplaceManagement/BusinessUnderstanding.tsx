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
    { title: "We Understand Your Business First", text:"Margins, logistics, pricing power, and inventory velocity matter. We build strategies around how your business actually makes money." },
    { title: "We Study Your Market & Competitors", text:"We analyze category leaders, challenger brands, pricing dynamics, keyword gaps, and ad pressure before making a single move." },
    { title: "We Align Strategy With Real KPIs", text:"Sessions don’t pay the bills. We optimize for conversions, revenue, TACoS, and long-term organic performance." },
    { title: "We Execute, Test, and Optimize Continuously", text:"eCommerce evolves daily. We test creatives, bids, keywords, and listing structures continuously scaling what works and fixing what doesn’t." },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        WHY BRANDS TRUST PERFOMAD FOR MARKETPLACE MANAGEMENT <br />
        <span className="text-primary">Don’t outsource your marketplace growth to guesswork. Work with specialists.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
