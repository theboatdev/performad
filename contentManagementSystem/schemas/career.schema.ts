import { z } from "zod";

export const JobOpeningSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.string(),
  tags: z.array(z.string()),
  isActive: z.boolean().optional(),
});

export const CareerSchema = z.object({
  heroTag: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string(),
  jobOpenings: z.array(JobOpeningSchema),
  categories: z.array(z.string()),
});
