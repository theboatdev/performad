import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  title,
  text,
  stars,
  image,
}) => {
  return (
    <div className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 bg-white border border-gray-100 text-gray-800 relative hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col h-full duration-300 transform hover:-translate-y-1">
      {/* Quote mark */}
      <div className="text-[4rem] sm:text-[5rem] text-blue-50 leading-[0.5] font-serif text-left mb-3 sm:mb-4 -ml-2">“</div>

      {/* Main text grows to fill space */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-left flex-grow z-10">{text}</p>

      {/* Footer stays at bottom */}
      <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 gap-4 sm:gap-0 justify-between items-start sm:items-center pt-5 border-t border-gray-50">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt={name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{title}</p>
          </div>
        </div>
        <div className="flex bg-gray-50 px-2.5 py-1.5 rounded-full border border-gray-100 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              strokeWidth={2}
              className={
                i < stars ? "fill-yellow-400 text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
