import { defineArrayMember, defineField, defineType } from "sanity";

export const JOB_CATEGORIES = [
  { title: "Development", value: "Development" },
  { title: "Design", value: "Design" },
  { title: "Marketing", value: "Marketing" },
  { title: "Customer Service", value: "Customer Service" },
  { title: "Finance", value: "Finance" },
  { title: "Management", value: "Management" },
  { title: "Operations", value: "Operations" },
];

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: JOB_CATEGORIES,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Remote",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "salary",
      title: "Salary",
      type: "string",
      description: "e.g. $3,000 – $4,500 / month or Competitive",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional cover image for the job listing.",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g. Full-time, Remote, Mid-level",
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        }),
      ],
    }),
    defineField({
      name: "applyUrl",
      title: "Apply URL or email",
      type: "string",
      description:
        "A hiring form link, or an email like mailto:careers@perfomad.com",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this role from the career page.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      location: "location",
      isPublished: "isPublished",
      media: "image",
    },
    prepare({ title, category, location, isPublished, media }) {
      return {
        title,
        subtitle: `${category || "No category"} · ${location || "No location"}${
          isPublished === false ? " · Hidden" : ""
        }`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
