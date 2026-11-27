import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: settings first, then content grouped the way editors think about the site. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("country").title("Study Abroad · Countries"),
      S.documentTypeListItem("courseCategory").title("Study India · Course categories"),
      S.documentTypeListItem("mbbsDestination").title("Study MBBS · Destinations"),
      S.documentTypeListItem("university").title("Universities & Colleges"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("partner").title("Partner logos"),
      S.divider(),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("post").title("Blog posts"),
    ]);
