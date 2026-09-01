import { z } from "zod";

export const BlogAuthorSchema = z.object({
  name: z.string(),
  photo: z.string(),
});

export const BlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use lowercase letters, numbers, and hyphens"),
  excerpt: z.string(),
  content: z.array(z.string()),
  image: z.string(),
  category: z.string(),
  author: BlogAuthorSchema,
  publishedAt: z.string().datetime(),
  isPublished: z.boolean(),
});
