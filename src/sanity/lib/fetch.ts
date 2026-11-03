import type { QueryParams } from "next-sanity";
import { client } from "./client";

/**
 * Cached Sanity query. Pages stay static: data is fetched at build time and only
 * refetched when the publish webhook (/api/revalidate) invalidates one of `tags`.
 * Tags are document type names, e.g. ["country", "university"].
 */
export function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = false,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
  /** Seconds before a background refresh, for time-based content like event end dates. */
  revalidate?: number | false;
}) {
  return client.withConfig({ useCdn: false }).fetch<T>(query, params, { cache: "force-cache", next: { tags, revalidate } });
}
