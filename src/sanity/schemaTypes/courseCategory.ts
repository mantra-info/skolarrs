import { defineArrayMember, defineField, defineType } from "sanity";
import { COLOR_OPTIONS } from "./presets";

/** Study India course area: /study-india/<slug> (e.g. Engineering & Technology). */
export const courseCategory = defineType({
  name: "courseCategory",
  title: "Course category",
  type: "document",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "page", title: "Page content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "card", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "card", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", group: "card" }),
    defineField({ name: "summary", type: "string", group: "card", description: "e.g. B.Tech | M.Tech | Mechanical | Civil" }),
    defineField({ name: "color", title: "Card colour", type: "string", group: "card", options: { list: COLOR_OPTIONS } }),
    defineField({ name: "icon", type: "image", group: "card", description: "White-background SVG icon." }),
    defineField({ name: "featuredOnHome", title: "Show in home 'Trending Courses'", type: "boolean", group: "card", initialValue: false }),
    defineField({ name: "homePhoto", title: "Home card photo", type: "image", group: "card", hidden: ({ parent }) => !parent?.featuredOnHome }),

    defineField({ name: "heroTitle", type: "string", group: "page" }),
    defineField({ name: "heroSlides", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })], group: "page" }),
    defineField({ name: "aboutBody", title: "About", type: "text", rows: 6, group: "page" }),
    defineField({ name: "benefits", title: "Why this field (cards)", type: "array", of: [defineArrayMember({ type: "imageCard" })], group: "page" }),
    defineField({ name: "trending", title: "Trending specialisations", type: "array", of: [defineArrayMember({ type: "imageCard" })], group: "page" }),
    defineField({
      name: "universities",
      type: "array",
      group: "page",
      of: [defineArrayMember({ type: "reference", to: [{ type: "university" }] })],
    }),
    defineField({ name: "promo", title: "Promo banner", type: "altImage", group: "page" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary", media: "icon" } },
});
