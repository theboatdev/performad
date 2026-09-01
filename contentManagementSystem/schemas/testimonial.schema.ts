import { z } from "zod";

export const TestimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  text: z.string().min(1, "Testimonial text is required").max(1000, "Text is too long"),
  stars: z.number().min(1).max(5),
  image: z.string().min(1, "Image is required"),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;
