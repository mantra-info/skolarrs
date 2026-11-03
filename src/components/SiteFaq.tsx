import Faq, { type FaqItem } from "./Faq";
import { sanityFetch } from "@/sanity/lib/fetch";
import { FAQS, type FaqDoc } from "@/sanity/lib/queries";
import { FAQ_CATEGORIES } from "@/sanity/schemaTypes/presets";

/** FAQ section with the questions an editor assigned to `page` in the CMS, grouped into tabs. */
export default async function SiteFaq({ page, ...props }: { page: string; title?: string; description?: string; className?: string }) {
  const docs = await sanityFetch<FaqDoc[]>({ query: FAQS, params: { page }, tags: ["faq"] });
  if (!docs.length) return null;

  const groups: Record<string, FaqItem[]> = {};
  for (const cat of [...FAQ_CATEGORIES, "Other"]) {
    const items = docs.filter((d) => (d.category ?? "Other") === cat).map((d) => ({ q: d.question, a: d.answer }));
    if (items.length) groups[cat] = items;
  }
  return <Faq {...props} faqs={groups} />;
}
