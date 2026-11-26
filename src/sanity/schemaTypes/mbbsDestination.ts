import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "./presets";

const detail = (r: { parent?: { hasDetailPage?: boolean } }) => !r.parent?.hasDetailPage;

/** MBBS destination (Russia, Georgia… or Private Medical Colleges in India): /study-mbbs/<slug>. */
export const mbbsDestination = defineType({
  name: "mbbsDestination",
  title: "MBBS destination",
  type: "document",
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "page", title: "Page content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "card", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "card", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "region",
      type: "string",
      group: "card",
      options: { list: [{ title: "Abroad", value: "abroad" }, { title: "India", value: "india" }], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", type: "number", group: "card" }),
    defineField({ name: "cardImage", type: "image", options: { hotspot: true }, group: "card" }),
    defineField({ name: "flag", type: "image", group: "card", hidden: ({ parent }) => parent?.region !== "abroad" }),
    defineField({
      name: "hasDetailPage",
      title: "Has its own page",
      type: "boolean",
      group: "card",
      initialValue: false,
      description: "Off = the card links to the enquiry form.",
    }),

    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, group: "page", hidden: detail }),
    defineField({ name: "introTitle", type: "string", group: "page", hidden: detail, description: "e.g. About MBBS In Russia" }),
    defineField({ name: "introBody", type: "text", rows: 5, group: "page", hidden: detail }),
    defineField({
      name: "keyPoints",
      type: "array",
      group: "page",
      hidden: detail,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "icon", type: "string", options: { list: ICON_OPTIONS } }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        }),
      ],
    }),
    defineField({ name: "universitiesTitle", type: "string", group: "page", hidden: detail }),
    defineField({
      name: "universities",
      type: "array",
      group: "page",
      hidden: detail,
      of: [defineArrayMember({ type: "reference", to: [{ type: "university" }], options: { filter: 'type == "medical"' } })],
    }),
    defineField({
      name: "fees",
      title: "Tuition fee table",
      type: "array",
      group: "page",
      hidden: detail,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", description: "e.g. Management Quota" }),
            defineField({ name: "fee", type: "string", description: "e.g. 15 Lakh" }),
            defineField({ name: "route", title: "Admission route", type: "string", description: "e.g. NEET, State Counselling" }),
          ],
          preview: { select: { title: "title", subtitle: "fee" } },
        }),
      ],
    }),
    defineField({ name: "whyImage", type: "image", options: { hotspot: true }, group: "page", hidden: detail }),
    defineField({ name: "whyItems", title: "Why Skolarrs (accordion)", type: "array", of: [defineArrayMember({ type: "titleBody" })], group: "page", hidden: detail }),
    defineField({ name: "promo", title: "Promo banner", type: "altImage", group: "page", hidden: detail }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "region", media: "cardImage" } },
});
