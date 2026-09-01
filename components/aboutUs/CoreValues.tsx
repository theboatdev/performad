import Image from "next/image";

interface CoreValue { title: string; description: string; }
interface Props { coreValues: CoreValue[]; }

const FALLBACK: CoreValue[] = [
  { title: "Results First", description: "We believe marketing should always deliver measurable outcomes. Every campaign we run is focused on performance, profitability, and scalable growth. Data guides our decisions, ensuring every strategy contributes directly to revenue and long-term success." },
  { title: "Strategic Thinking", description: "Success in the digital landscape requires more than tactics. We combine data, creativity, and deep market insights to build strategies that position brands for sustainable growth across multiple channels and platforms." },
  { title: "Partnership Mindset", description: "We treat our clients as partners. By understanding each business deeply, we align our goals with theirs and work collaboratively to achieve meaningful and lasting growth." },
  { title: "Continuous Optimization", description: "Digital markets evolve constantly, and so do we. Through constant testing, analysis, and refinement, we improve campaigns and strategies to maximize performance and unlock new growth opportunities." },
];

export default function CoreValues({ coreValues }: Props) {
  const list = coreValues.length > 0 ? coreValues : FALLBACK;
  return (
    <>
      <div className="py-16">
        <h1 className="text-3xl md:text-3xl font-bold mb-4">Our Core Values</h1>
        <p>Our values guide how we work with every partner, every campaign, and every strategy. <br/> We focus on measurable growth, long-term partnerships, and delivering marketing that drives real business impact.</p>
      </div>
      <section className="pt-4 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((value, index) => (
            <div key={index} className="relative bg-white border border-primary rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col overflow-hidden">
              <div className="flex items-center mb-4">
                <Image src="/coreValues/balance.png" alt={value.title} width={48} height={48} className="p-2 bg-gray-100 rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-left mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-10 text-justify">{value.description}</p>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/25 rounded-full translate-x-1/4 translate-y-1/4" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}