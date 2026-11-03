import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export type SanityImage = { asset?: { _ref: string }; alt?: string } | null | undefined;

/** Resized, auto-format (WebP/AVIF) image URL served from Sanity's CDN — never Vercel's optimizer. */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");

/**
 * URL for an <img src>. Raster images are resized to `width` (2x-ready by default);
 * SVGs are returned untouched so they stay vector.
 */
export function img(image: SanityImage, width = 1600): string {
  if (!image?.asset?._ref) return "";
  if (image.asset._ref.endsWith("-svg")) return builder.image(image).url();
  return urlFor(image).width(width).fit("max").url();
}
