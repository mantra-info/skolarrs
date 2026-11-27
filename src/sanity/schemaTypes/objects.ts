import { defineArrayMember, defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", description: "Browser tab / Google title. Defaults to the page name." }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: "image", title: "Social share image", type: "image" }),
  ],
});

/** A label + value row, e.g. "Annual Tuition (Masters)" → "$18,000 – $25,000". */
export const labelValue = defineType({
  name: "labelValue",
  title: "Row",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

export const titleBody = defineType({
  name: "titleBody",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const imageCard = defineType({
  name: "imageCard",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title", subtitle: "body", media: "image" } },
});

export const link = defineType({
  name: "link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "URL", type: "string", description: "e.g. /study-abroad or https://…", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Rich text for blog posts and long descriptions. */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});

/** Image with required alt text, used where the image carries meaning. */
export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
});

/** One eligibility card, e.g. "English Language Proficiency" with Undergraduate / Postgraduate lists. */
export const eligibilityCard = defineType({
  name: "eligibilityCard",
  title: "Eligibility card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "levels",
      type: "array",
      of: [
        defineArrayMember({
          name: "eligibilityLevel",
          title: "Level",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", description: "e.g. Undergraduate", validation: (r) => r.required() }),
            defineField({
              name: "points",
              type: "array",
              description: "One line per requirement. Select text and press B for bold.",
              of: [defineArrayMember({ type: "block", styles: [], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } })],
            }),
          ],
          preview: { select: { title: "name" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});

/** Plain paragraphs where editors can only bold words (select text, press ⌘B). */
export const simpleText = defineType({
  name: "simpleText",
  title: "Text",
  type: "array",
  of: [defineArrayMember({ type: "block", styles: [], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }], annotations: [] } })],
});

export const objects = [seo, labelValue, titleBody, imageCard, link, richText, altImage, eligibilityCard, simpleText];
