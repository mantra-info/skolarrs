import type { Metadata } from "next";
import { img } from "./image";
import type { Seo } from "./queries";

/** Page metadata from a document's SEO fields, falling back to `title`. */
export function seoMetadata(seo: Seo | undefined, title: string): Metadata {
  const image = img(seo?.image, 1200);
  return {
    title: seo?.title || title,
    description: seo?.description,
    openGraph: image ? { images: [image] } : undefined,
  };
}
