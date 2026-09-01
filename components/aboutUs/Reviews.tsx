"use client";
import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";

interface Testimonial { text: string; name: string; role: string; image: string; }
interface Props { testimonials: Testimonial[]; }

const FALLBACK: Testimonial[] = [
  { text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me.", name: "Peter Braun", role: "Business Owner", image: "/coreValues/balance.png" },
  { text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me.", name: "Anna Smith", role: "Marketing Director", image: "/coreValues/hand.png" },
  { text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me.", name: "John Carter", role: "Entrepreneur", image: "/coreValues/Openness.png" },
  { text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me.", name: "Lisa Wong", role: "Startup Founder", image: "/coreValues/planet.png" },
];

export default function Reviews({ testimonials }: Props) {
  const list = testimonials.length > 0 ? testimonials : FALLBACK;
  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else if (window.innerWidth === 1024) setVisibleSlides(3);
      else setVisibleSlides(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="bg-gradient-to-r from-primary/25 to-primary/45 py-12 relative overflow-hidden w-full">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <p className="text-center text-primary font-semibold uppercase">Testimonials</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">People Say About Us</h2>
        <div className="flex flex-col justify-between">
          <div className="flex gap-4 sm:gap-6 transition-transform duration-500 mb-6">
            {Array.from({ length: visibleSlides }).map((_, i) => {
              const t = list[(index + i) % list.length];
              return (
                <div key={i} className="flex-1 min-w-[250px]">
                  <TestimonialCard text={t.text} name={t.name} role={t.role} image={t.image} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center sm:justify-end gap-3">
            <button onClick={() => setIndex((p) => (p - 1 + list.length) % list.length)} className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-secondaryBackground">←</button>
            <button onClick={() => setIndex((p) => (p + 1) % list.length)} className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-secondaryBackground">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}