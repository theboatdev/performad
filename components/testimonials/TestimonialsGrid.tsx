import React from "react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../data/testimonials";

const TestimonialsGrid: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {testimonials.map((t) => (
          <TestimonialCard key={t._id} {...t} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsGrid;
