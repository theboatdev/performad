import { z } from "zod";

export const OfficeSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
    message: "Invalid email",
  }),
  mapUrl: z.string().refine((v) => v === "" || v.startsWith("http"), {
    message: "Invalid URL",
  }),
});

export const FAQSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ContactUsSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  contactEmail: z.string().refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
    message: "Invalid email",
  }),
  contactPhone: z.string(),
  contactAddress: z.string(),
  offices: z.array(OfficeSchema),
  faqs: z.array(FAQSchema),
});