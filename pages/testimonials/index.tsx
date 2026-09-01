"use client";

import TestimonialsGrid from "../../components/testimonials/TestimonialsGrid";
import BlogSection from "../../components/layout/BlogSection";
import HireUsBanner from "../../components/testimonials/HireUsBanner";


export default function Testimonials() {
  return (
    <div className="bg-background">
        <BlogSection
            tag="Testimonials"
            title="What Our Clients Say"
            description="Discover why businesses trust us. Read through their experiences and see how our tailored solutions have empowered them to hit their goals."
            component={<TestimonialsGrid />}
        />
        <HireUsBanner/>
    </div>
  );
}
