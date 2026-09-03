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
    { title: "We Start With Business Objectives", text:"Before launching anything, we align on margins, targets, and growth priorities—ads support the business, not just traffic numbers." },
    { title: "We Research Your Audience Deeply", text:"We analyze behaviors, motivations, objections, and buying triggers—then translate insights into campaign and creative strategy." },
    { title: "We Optimize Around Real KPIs", text:"ROAS, CPA, conversion rate, and customer acquisition cost—not likes or impressions." },
    { title: "We Test, Learn, and Scale Continuously", text:"Paid social evolves fast. We iterate aggressively—scaling what works, cutting what doesn’t, and staying ahead of platform changes." },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        WHY BRANDS CHOOSE PERFOMAD FOR PAID SOCIAL <br />
        <span className="text-primary">Don’t spend on ads blindly. Work with a team built for performance.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
