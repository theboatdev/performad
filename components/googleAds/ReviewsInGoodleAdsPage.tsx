"use client";

import { useState, useEffect } from "react";
import TestimonialCard from "../aboutUs/TestimonialCard";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me. It's Easy...",
    name: "Peter Braun",
    role: "Business Owner",
    image: "/coreValues/balance.png",
  },
  {
    text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me. It's Easy...",
    name: "Anna Smith",
    role: "Marketing Director",
    image: "/coreValues/hand.png",
  },
  {
    text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me. It's Easy...",
    name: "John Carter",
    role: "Entrepreneur",
    image: "/coreValues/Openness.png",
  },
  {
    text: "I'm A Paragraph. Click Here To Add Your Own Text And Edit Me. It's Easy...",
    name: "Lisa Wong",
    role: "Startup Founder",
    image: "/coreValues/planet.png",
  },
];

export default function ReviewsInGoodleAdsPage() {
  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Function to detect slides per view
  const updateVisibleSlides = () => {
    if (window.innerWidth < 640) {
      setVisibleSlides(1);
    } else if (window.innerWidth < 1024) {
      setVisibleSlides(2);
    }else if (window.innerWidth == 1024){
      setVisibleSlides(3);
    } else {
      setVisibleSlides(4);
    }
  };

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
  }, []);

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <h2 className="text-center text-2xl sm:text-4xl font-bold mb-8">
          What working with us means.
        </h2>

        <div className="flex flex-col justify-between">
          {/* Card Container */}
          <div className="flex gap-4 sm:gap-6 transition-transform duration-500 mb-6">
            {Array.from({ length: visibleSlides }).map((_, i) => {
              const testimonial =
                testimonials[(index + i) % testimonials.length];
              return (
                <div key={i} className="flex-1 min-w-[250px]">
                  <TestimonialCard
                    text={testimonial.text}
                    name={testimonial.name}
                    role={testimonial.role}
                    image={testimonial.image}
                  />
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex justify-center sm:justify-end gap-3">
            <button
              onClick={prevSlide}
              className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-secondaryBackground"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-secondaryBackground"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
