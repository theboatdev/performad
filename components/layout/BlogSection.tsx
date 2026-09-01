import React from "react";

interface BlogSectionProps {
  tag: string;
  title: string;
  description: string;
  component?: React.ReactNode;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  tag,
  title,
  description,
  component,
}) => {
  return (
    <section
      className="relative bg-cover bg-center py-16 md:py-20 flex flex-col items-center text-center bg-primary/90 min-h-[80vh] w-full"
      style={{
        backgroundImage: "url('/layout/background.png')",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "top",
        backgroundSize: "100%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/80"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Tag */}
        <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
          {tag}
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-8 text-sm sm:text-base px-2 sm:px-0">
          {description}
        </p>

        {component && <div className="mt-6">{component}</div>}
      </div>
    </section>
  );
};

export default BlogSection;
