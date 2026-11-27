import Button from "@/components/Button";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { LATEST_POSTS, type HomeDoc, type PostCard } from "@/sanity/lib/queries";

const TAGS: Record<string, { bg: string; border: string; color: string }> = {
  "Abroad Study": { bg: "rgba(255,201,51,0.2)", border: "#e7a700", color: "#e7a700" },
  News: { bg: "rgba(60,42,33,0.15)", border: "#3c2a21", color: "#3c2a21" },
  Engineering: { bg: "rgba(0,87,219,0.12)", border: "#0057db", color: "#0057db" },
  Counselling: { bg: "rgba(0,108,127,0.1)", border: "#006c7f", color: "#006c7f" },
};

function TagChip({ tag }: { tag?: string }) {
  if (!tag) return null;
  const t = TAGS[tag] ?? TAGS.News;
  return (
    <div>
      <span className="inline-flex items-center rounded-3xl border-[0.5px] px-3 py-2 text-label" style={{ backgroundColor: t.bg, borderColor: t.border, color: t.color }}>
        {tag}
      </span>
    </div>
  );
}

function Meta({ post, small }: { post: PostCard; small?: boolean }) {
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }) : null;
  if (!date && !post.readingTime) return null;
  return (
    <div className={`flex items-center gap-6 text-[#777] ${small ? "text-xs leading-4 tracking-[-0.0075rem]" : "text-h6"}`}>
      {date && <span>{date}</span>}
      {date && post.readingTime && <span className="w-px self-stretch bg-[#cecece]" />}
      {post.readingTime && <span>{post.readingTime} Min read</span>}
    </div>
  );
}

const CARD = "flex flex-col gap-6 rounded-3xl border-[0.5px] border-[#cecece] bg-white p-6 transition hover:shadow-lg";

export default async function Blogs({ home }: { home: HomeDoc }) {
  const posts = await sanityFetch<PostCard[]>({ query: LATEST_POSTS, tags: ["post"] });
  if (!posts.length) return null;
  const [featured, ...rest] = posts;

  return (
    <section id="blogs" className="bg-surface py-16 md:py-20">
      <div className="container-x flex flex-col gap-12">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">{home.blogsTitle}</h2>
        <div className="flex flex-col gap-6 lg:flex-row">
          <article className={`${CARD} lg:w-[48.125rem] lg:shrink-0`}>
            <div className="relative aspect-[722/470] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:flex-1">
              {featured.coverImage && <img loading="lazy" src={img(featured.coverImage, 1500)} alt={featured.coverImage.alt ?? ""} className="absolute inset-0 size-full object-cover" />}
            </div>
            <div className="flex flex-col gap-4">
              <TagChip tag={featured.category} />
              <h3 className="text-xl/7 font-medium tracking-[-0.009375rem] text-ink md:text-h5">{featured.title}</h3>
            </div>
            {featured.excerpt && <p className="text-base text-ink md:text-h6">{featured.excerpt}</p>}
            <Meta post={featured} />
          </article>

          {rest.length > 0 && (
            <>
              <span className="hidden w-px self-stretch bg-[#e0e0e0] lg:block" />
              <div className="mobile-rail grid flex-1 gap-3 [--rail-item:75%] sm:grid-cols-2">
                {rest.map((b) => (
                  <article key={b.slug} className={`${CARD} h-[23.5rem]`}>
                    <div className="relative flex-1 overflow-hidden rounded-2xl">
                      {b.coverImage && <img loading="lazy" src={img(b.coverImage, 700)} alt={b.coverImage.alt ?? ""} className="absolute inset-0 size-full object-cover" />}
                    </div>
                    <div className="flex flex-col gap-4">
                      <TagChip tag={b.category} />
                      <p className="text-h6 text-ink">{b.title}</p>
                    </div>
                    <Meta post={b} small />
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
        {home.blogsButton?.href && (
          <div className="flex justify-center">
            <Button href={home.blogsButton.href} variant="secondary">
              {home.blogsButton.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
