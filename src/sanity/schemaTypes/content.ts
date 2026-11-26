import { defineArrayMember, defineField, defineType } from "sanity";
import { BLOG_CATEGORIES, FAQ_CATEGORIES, PAGE_OPTIONS } from "./presets";

export const service = defineType({
  name: "service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "offerings", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "course", type: "string" }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(1).max(5), initialValue: 5 }),
    defineField({ name: "quote", type: "text", rows: 4 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "videoUrl", title: "Video URL", type: "url", description: "YouTube link for video testimonials." }),
    defineField({ name: "university", title: "College review for", type: "reference", to: [{ type: "university" }], description: "Shows on that college's page." }),
    defineField({ name: "pages", title: "Show on pages", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: PAGE_OPTIONS } }),
  ],
  preview: { select: { title: "name", subtitle: "course", media: "photo" } },
});

export const event = defineType({
  name: "event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", type: "string", description: "e.g. Nursing, Engineering" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "cta", title: "Button", type: "link" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date", description: "Hidden from the site after this date." }),
  ],
  orderings: [{ title: "Start date", name: "start", by: [{ field: "startDate", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "endDate", media: "image" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", options: { list: BLOG_CATEGORIES } }),
    defineField({ name: "coverImage", type: "altImage" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "body", type: "richText" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", options: { list: FAQ_CATEGORIES }, description: "Tab the question appears under." }),
    defineField({ name: "pages", title: "Show on pages", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: PAGE_OPTIONS } }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner logo",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", validation: (r) => r.required() }),
    defineField({
      name: "group",
      type: "string",
      options: { list: [{ title: "Abroad", value: "abroad" }, { title: "India", value: "india" }], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "group", media: "logo" } },
});
