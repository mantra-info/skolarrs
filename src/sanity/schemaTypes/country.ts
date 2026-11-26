import { defineArrayMember, defineField, defineType } from "sanity";
import { ColorInput } from "../components/ColorInput";
import { HEX_COLOR } from "./presets";

const colorField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "string",
    description,
    components: { input: ColorInput },
    validation: (r) => r.regex(HEX_COLOR, { name: "hex colour, like #c9372c" }),
  });

/** Study-abroad destination: /study-abroad/<slug>. */
export const country = defineType({
  name: "country",
  title: "Country",
  type: "document",
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "content", title: "Page content" },
    { name: "costs", title: "Costs & application" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "basic", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "basic", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "order", type: "number", group: "basic", description: "Position on the Study Abroad page (1 = first)." }),
    defineField({
      name: "colors",
      title: "Page colours",
      type: "object",
      group: "basic",
      description: "Leave a colour blank to keep the default blue and gold. Text on top turns white or dark automatically.",
      fields: [
        colorField("main", "Main colour", "Universities and testimonials sections, and buttons."),
        colorField("eligibility", "Eligibility section", "Background of the eligibility section."),
        colorField("cost", "Cost section", "Background of the cost section."),
      ],
    }),
    defineField({ name: "flag", type: "image", group: "basic", description: "Round flag SVG." }),
    defineField({ name: "cardImage", type: "image", options: { hotspot: true }, group: "basic", description: "Photo on the destination cards." }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, group: "content" }),

    defineField({ name: "whyBody", title: "Why study here", type: "text", rows: 5, group: "content" }),
    defineField({ name: "universitiesBody", title: "Universities intro", type: "text", rows: 5, group: "content" }),
    defineField({
      name: "universities",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "university" }], options: { filter: 'type == "abroad"' } })],
    }),
    defineField({ name: "coursesBody", title: "Courses intro", type: "text", rows: 4, group: "content" }),
    defineField({ name: "courses", title: "Popular courses", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "eligibilityBody", title: "Eligibility intro", type: "text", rows: 4, group: "content" }),
    defineField({ name: "eligibility", title: "Eligibility cards", type: "array", of: [defineArrayMember({ type: "eligibilityCard" })], group: "content", description: "The eligibility section only shows when this has cards." }),
    defineField({ name: "examsBody", title: "Exams", type: "text", rows: 4, group: "content" }),

    defineField({ name: "costBody", title: "Cost intro", type: "text", rows: 4, group: "costs" }),
    defineField({ name: "costOfStudy", type: "array", of: [defineArrayMember({ type: "labelValue" })], group: "costs" }),
    defineField({ name: "costOfLiving", type: "array", of: [defineArrayMember({ type: "labelValue" })], group: "costs" }),
    defineField({ name: "applicationBody", title: "Application intro", type: "text", rows: 4, group: "costs" }),
    defineField({ name: "requirements", type: "array", of: [defineArrayMember({ type: "titleBody" })], group: "costs" }),
    defineField({ name: "promo", title: "Promo banner", type: "altImage", group: "costs" }),

    defineField({ name: "faqs", title: "FAQs", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })], group: "seo" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "flag" } },
});
