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
    { title: "We Start With Your Business Goals", text:"We don’t launch campaigns blindly. We understand your margins, average order value, and growth targets before structuring any campaign." },
    { title: "We Research Your Market Deeply", text:"Competitors, keyword intent, auction insights, and customer behavior—every strategy is built on real market data." },
    { title: "We Align Ads With Real KPIs", text:"ROAS, CPA, profit—not impressions or clicks. Every decision ties back to your actual business metrics." },
    { title: "We Build, Test, and Scale Iteratively", text:"Continuous testing across creatives, bidding strategies, audiences, and landing pages—scaling what works and cutting what doesn’t." },
  ];

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        WHY BRANDS CHOOSE PerfomAd FOR GOOGLE ADS <br />
        <span className="text-primary">Don’t leave paid traffic to chance. Work with a Google Ads team built for performance.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {cards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
