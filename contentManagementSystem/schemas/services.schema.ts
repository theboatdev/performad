import { z } from "zod";

export const ServiceCardSchema = z.object({
  title: z.string(),
  cardImage: z.string(),
  description: z.string(),
  cardSize: z.enum(["m", "l"]),
});

export const SeoFeatureSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export const BusinessPillarSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export const DontDoItemSchema = z.object({
  text: z.string(),
});

export const ServicesSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title: z.string(),
    highlight: z.string(),
    description: z.string(),
    buttonText: z.string(),
    image: z.string(),
  }),
  servicesSection: z.object({
    heading: z.string(),
    description: z.string(),
  }),
  serviceCards: z.array(ServiceCardSchema),
  seoSection: z.object({
    headingPrefix: z.string(),
    headingHighlight: z.string(),
    supportingText: z.string(),
  }),
  seoFeatures: z.array(SeoFeatureSchema),
  businessSection: z.object({
    heading: z.string(),
    highlight: z.string(),
  }),
  businessPillars: z.array(BusinessPillarSchema),
  dontSection: z.object({
    heading: z.string(),
    image: z.string(),
  }),
  dontDoItems: z.array(DontDoItemSchema),
  ctaSection: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    buttonText: z.string(),
  }),
});
