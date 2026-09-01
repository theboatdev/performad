import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  _id: string;
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
}

const TestimonialsGrid: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.ok && Array.isArray(data.data)) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full mb-4"></div>
              <p className="text-gray-500 font-medium">Loading testimonials...</p>
            </div>
          </div>
        ) : testimonials.length > 0 ? (
          testimonials.map((t) => (
            <TestimonialCard key={t._id} {...t} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full py-20">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialsGrid;