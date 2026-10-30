import { defineArrayMember, defineField, defineType } from "sanity";

const detail = (r: { parent?: { hasDetailPage?: boolean } }) => !r.parent?.hasDetailPage;

/** Every university / college, listed once and linked from countries, courses and MBBS pages. */
export const university = defineType({
  name: "university",
  title: "University / College",
  type: "document",
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "detail", title: "Detail page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "basic", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "basic", options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({
      name: "type",
      type: "string",
      group: "basic",
      options: {
        list: [
          { title: "Abroad university", value: "abroad" },
          { title: "Indian college", value: "india" },
          { title: "Medical college / university", value: "medical" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "logo", type: "image", group: "basic", description: "Transparent PNG/SVG, logo filling the canvas.", validation: (r) => r.required() }),
    defineField({ name: "city", type: "string", group: "basic" }),
    defineField({ name: "country", type: "string", group: "basic" }),
    defineField({
      name: "hasDetailPage",
      title: "Has its own page",
      type: "boolean",
      group: "basic",
      initialValue: false,
      description: "Turn on to publish /colleges/<slug> and fill the Detail page tab.",
    }),

    defineField({ name: "courseCategory", title: "Course category (breadcrumb)", type: "reference", to: [{ type: "courseCategory" }], group: "detail", hidden: detail }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, group: "detail", hidden: detail }),
    defineField({ name: "about", type: "array", of: [defineArrayMember({ type: "text", rows: 5 })], group: "detail", hidden: detail, description: "One entry per paragraph." }),
    defineField({ name: "aboutImage", type: "image", options: { hotspot: true }, group: "detail", hidden: detail }),
    defineField({
      name: "pillars",
      title: "Vision / Mission / Values",
      type: "array",
      of: [defineArrayMember({ type: "titleBody" })],
      group: "detail",
      hidden: detail,
      validation: (r) => r.max(3),
    }),
    defineField({ name: "stats", type: "array", of: [defineArrayMember({ type: "labelValue" })], group: "detail", hidden: detail, description: "e.g. 150+ → Faculty Members" }),
    defineField({ name: "campusGallery", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })], group: "detail", hidden: detail, description: "First image is shown large, next three small." }),
    defineField({ name: "ugProgrammes", title: "UG programmes", type: "array", of: [defineArrayMember({ type: "titleBody" })], group: "detail", hidden: detail }),
    defineField({ name: "pgProgrammes", title: "PG programmes", type: "array", of: [defineArrayMember({ type: "titleBody" })], group: "detail", hidden: detail }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Name", name: "name", by: [{ field: "name", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "city", media: "logo" } },
});
