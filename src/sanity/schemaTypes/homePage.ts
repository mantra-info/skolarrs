import { defineArrayMember, defineField, defineType } from "sanity";
import { ColorInput } from "../components/ColorInput";
import { HEX_COLOR } from "./presets";

/**
 * Singleton: every editable word, number, link and photo on the homepage.
 * Decorative artwork (planes, skylines, maps) stays in code so the layout can't break.
 */

const color = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "string",
    description,
    components: { input: ColorInput },
    validation: (r) => r.regex(HEX_COLOR, { name: "hex colour, like #163e78" }),
  });

const lines = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })], description });

const button = (name = "button", title = "Button") => defineField({ name, title, type: "link" });

export const HERO_DESIGNS = [
  { title: "Study Abroad (planes & students)", value: "abroad" },
  { title: "Study in India (yellow wave)", value: "domestic" },
  { title: "MBBS (doctor)", value: "mbbs" },
  { title: "Law (lawyer)", value: "law" },
];

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero slider", default: true },
    { name: "strength", title: "Our Strength" },
    { name: "services", title: "Services" },
    { name: "journey", title: "Parent / Student" },
    { name: "destination", title: "Destination" },
    { name: "courses", title: "Trending courses" },
    { name: "banners", title: "Banners" },
    { name: "compare", title: "Before / After" },
    { name: "loans", title: "Loans" },
    { name: "partners", title: "Partners" },
    { name: "blogs", title: "Blogs" },
  ],
  fields: [
    // ---------- hero ----------
    defineField({
      name: "heroSlides",
      title: "Slides",
      group: "hero",
      type: "array",
      of: [
        defineArrayMember({
          name: "heroSlide",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Full banner image",
              type: "image",
              options: { hotspot: true },
              description:
                "Optional. Replaces the whole slide background. Use a wide image (at least 2400 × 1350) with empty space on the left for the heading and button. Set the hotspot on the important part so it stays visible when cropped.",
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile banner image",
              type: "image",
              options: { hotspot: true },
              description: "Optional. Tall version for phones (about 1080 × 1440). Without it, phones show a crop of the banner image.",
              hidden: ({ parent }) => !parent?.image,
            }),
            defineField({
              name: "design",
              type: "string",
              description: "Built-in artwork used when there is no banner image.",
              options: { list: HERO_DESIGNS },
              hidden: ({ parent }) => !!parent?.image,
              validation: (r) =>
                r.custom((value, ctx) => (value || (ctx.parent as { image?: unknown } | undefined)?.image ? true : "Pick a design or upload a banner image")),
            }),
            defineField({ name: "line1", title: "Heading line 1", type: "string", description: "Leave the heading empty if the banner image already contains the text." }),
            defineField({ name: "line2", title: "Heading line 2", type: "string" }),
            defineField({ name: "line3", title: "Heading line 3", type: "string" }),
            defineField({ name: "accent", title: "Gold word after the heading", type: "string", description: "Optional, e.g. Anywhere" }),
            defineField({ name: "subtitle", type: "string" }),
            button(),
            defineField({
              name: "buttonStyle",
              type: "string",
              options: { list: [{ title: "Blue", value: "primary" }, { title: "Yellow", value: "secondary" }], layout: "radio", direction: "horizontal" },
              initialValue: "primary",
            }),
            defineField({ name: "darkText", title: "Dark text", type: "boolean", description: "Turn on for light backgrounds.", initialValue: false }),
            defineField({
              name: "shade",
              title: "Darken left side of the banner",
              type: "boolean",
              description: "Adds a soft dark fade behind the text so white text stays readable on bright photos.",
              initialValue: false,
              hidden: ({ parent }) => !parent?.image,
            }),
            defineField({
              ...color("backgroundFrom", "Background colour 1", "Optional. Leave both empty to keep the design's own background."),
              hidden: ({ parent }) => !!parent?.image,
            }),
            defineField({ ...color("backgroundTo", "Background colour 2"), hidden: ({ parent }) => !!parent?.image }),
            defineField({ name: "hidden", title: "Hide this slide", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { a: "line1", b: "line2", c: "line3", design: "design", hidden: "hidden", media: "image" },
            prepare: ({ a, b, c, design, hidden, media }) => ({
              title: [a, b, c].filter(Boolean).join(" ") || "Banner image slide",
              subtitle: `${hidden ? "Hidden · " : ""}${media ? "Banner image" : (design ?? "")}`,
              media,
            }),
          },
        }),
      ],
    }),

    // ---------- strength ----------
    defineField({ name: "strengthTitle", title: "Title", group: "strength", type: "string" }),
    defineField({ name: "strengthBody", title: "Text", group: "strength", type: "simpleText" }),
    defineField({ ...lines("strengthPoints", "Bullet points"), group: "strength" }),
    defineField({ ...button("strengthButton"), group: "strength" }),
    defineField({ name: "strengthPhoto", title: "Photo", group: "strength", type: "altImage" }),
    defineField({
      name: "strengthStats",
      title: "Stat cards",
      group: "strength",
      type: "array",
      of: [
        defineArrayMember({
          name: "statCard",
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 1000+", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            color("color", "Card colour"),
            defineField({ name: "icon", type: "image" }),
          ],
          preview: { select: { title: "value", subtitle: "label", media: "icon" } },
        }),
      ],
    }),

    // ---------- services ----------
    defineField({ name: "servicesTitle", title: "Title", group: "services", type: "string" }),
    defineField({ name: "servicesBody", title: "Text", group: "services", type: "text", rows: 3 }),
    defineField({ ...lines("servicesPoints", "Bullet points"), group: "services" }),
    defineField({ ...button("servicesButton"), group: "services" }),
    defineField({ name: "servicesImage", title: "Photo", group: "services", type: "altImage", description: "Cut-out photo with a transparent background." }),

    // ---------- journey ----------
    defineField({ name: "journeyTitle", title: "Title", group: "journey", type: "string" }),
    defineField({ name: "journeyBody", title: "Text", group: "journey", type: "text", rows: 2, description: "Line breaks show on tablet and desktop." }),
    defineField({
      name: "journeyCards",
      title: "Cards",
      group: "journey",
      type: "array",
      validation: (r) => r.max(2),
      description: "First card uses the Parent layout, second the Student layout.",
      of: [
        defineArrayMember({
          name: "journeyCard",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "blurb", type: "text", rows: 2 }),
            color("color", "Card colour"),
            color("innerColor", "Inner panel colour"),
            defineField({ name: "icon", type: "image" }),
            defineField({ name: "photo", type: "image" }),
            lines("points", "Bullet points"),
            button(),
          ],
          preview: { select: { title: "title", media: "icon" } },
        }),
      ],
    }),

    // ---------- destination ----------
    defineField({ name: "destinationTitle", title: "Title", group: "destination", type: "string" }),
    defineField({ name: "destinationBody", title: "Text", group: "destination", type: "simpleText" }),
    defineField({ ...button("destinationButton"), group: "destination" }),

    // ---------- trending courses ----------
    defineField({ name: "coursesTitle", title: "Title", group: "courses", type: "string" }),
    defineField({
      name: "courses",
      title: "Course cards",
      group: "courses",
      type: "array",
      of: [
        defineArrayMember({
          name: "courseCard",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string", description: "e.g. /study-india/engineering-and-technology" }),
            color("color", "Card colour"),
            color("photoBackground", "Colour behind the photo", "Shows through transparent photos."),
            defineField({ name: "photo", type: "image", options: { hotspot: true } }),
            defineField({ name: "icon", type: "image" }),
          ],
          preview: { select: { title: "title", subtitle: "description", media: "photo" } },
        }),
      ],
    }),
    defineField({ ...button("coursesButton"), group: "courses" }),

    // ---------- banners ----------
    defineField({
      name: "banners",
      group: "banners",
      type: "array",
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          name: "banner",
          type: "object",
          fields: [
            lines("heading", "Heading lines"),
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            button(),
            defineField({
              name: "buttonStyle",
              type: "string",
              options: { list: [{ title: "Blue", value: "primary" }, { title: "Yellow", value: "secondary" }], layout: "radio", direction: "horizontal" },
              initialValue: "primary",
            }),
          ],
          preview: { select: { title: "heading.0", subtitle: "heading.1", media: "image" } },
        }),
      ],
    }),

    // ---------- before / after ----------
    defineField({
      name: "compareBefore",
      title: "Before Skolarrs",
      group: "compare",
      type: "object",
      fields: [
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "title", type: "text", rows: 2, description: "Press Enter for a line break." }),
        defineField({ name: "subtitle", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          of: [
            defineArrayMember({
              name: "compareItem",
              type: "object",
              fields: [defineField({ name: "label", type: "string", validation: (r) => r.required() }), defineField({ name: "icon", type: "image" })],
              preview: { select: { title: "label", media: "icon" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "compareAfter",
      title: "With Skolarrs",
      group: "compare",
      type: "object",
      fields: [
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "title", type: "text", rows: 2, description: "Press Enter for a line break." }),
        defineField({ name: "subtitle", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          of: [
            defineArrayMember({
              name: "compareItem",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: (r) => r.required() }),
                defineField({ name: "icon", type: "image" }),
                defineField({ name: "green", title: "Green highlight", type: "boolean", initialValue: false }),
              ],
              preview: { select: { title: "label", media: "icon" } },
            }),
          ],
        }),
      ],
    }),

    // ---------- loans ----------
    defineField({ name: "loansTitle", title: "Title", group: "loans", type: "string" }),
    defineField({ name: "loansBody", title: "Text", group: "loans", type: "text", rows: 2 }),
    defineField({ ...lines("loansPoints", "Bullet points"), group: "loans" }),
    defineField({ ...button("loansButton"), group: "loans" }),

    // ---------- partners ----------
    defineField({ name: "partnersCount", title: "Big number", group: "partners", type: "string", description: "e.g. 1500+" }),
    defineField({ name: "partnersTitle", title: "Title", group: "partners", type: "string" }),
    defineField({ name: "partnersSubtitle", title: "Subtitle", group: "partners", type: "string" }),

    // ---------- blogs ----------
    defineField({ name: "blogsTitle", title: "Title", group: "blogs", type: "string", description: "The 5 newest blog posts are shown under it." }),
    defineField({ ...button("blogsButton"), group: "blogs" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
