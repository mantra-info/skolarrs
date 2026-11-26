import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: contact details, socials and stats repeated across pages. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "phones", type: "array", of: [defineArrayMember({ type: "string" })], description: "Shown in Contact section, e.g. +91 97904 44443" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", description: "Digits only with country code, e.g. 919790444443" }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "network", type: "string", options: { list: ["Facebook", "Instagram", "YouTube", "LinkedIn", "X"] } }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "network", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Headline stats",
      type: "array",
      of: [defineArrayMember({ type: "labelValue" })],
      description: "Reused on several pages, e.g. 1500+ → University Tie-ups.",
    }),
    defineField({ name: "enquiryEmail", title: "Send enquiries to", type: "string", description: "Where contact-form submissions are emailed." }),
    defineField({ name: "seo", title: "Default SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
