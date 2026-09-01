import { z } from "zod";

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
});

export const StatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string(),
  linkedin: z.string(),
});

export const CoreValueSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const TestimonialSchema = z.object({
  text: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
});

export const AboutUsSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  heroDescription: z.string(),
  services: z.array(ServiceSchema),
  stats: z.array(StatSchema),
  team: z.array(TeamMemberSchema),
  coreValues: z.array(CoreValueSchema),
  testimonials: z.array(TestimonialSchema),
  contentHeading: z.string(),
  contentDescription: z.string(),
});