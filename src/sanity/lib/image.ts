import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Resized, auto-format (WebP/AVIF) image URL served from Sanity's CDN — never Vercel's optimizer. */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");
