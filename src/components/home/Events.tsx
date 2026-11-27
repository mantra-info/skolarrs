import Button from "@/components/Button";
import LinkArrow from "@/components/LinkArrow";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { EVENTS, type EventDoc } from "@/sanity/lib/queries";

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-3xl border-[0.5px] border-[#0a8f7c] bg-[rgba(38,166,154,0.1)] px-3 py-2 text-label text-[#26a69a]">
      {children}
    </span>
  );
}

export default async function Events() {
  const today = new Date().toISOString().slice(0, 10);
  // Refreshed daily so events drop off after their end date without a publish.
  const events = await sanityFetch<EventDoc[]>({ query: EVENTS, params: { today }, tags: ["event"], revalidate: 86400 });
  if (!events.length) return null;

  return (
    <section id="events" className="overflow-hidden bg-surface py-16 md:py-20">
      <div className="container-x flex flex-col gap-12">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Featured Events</h2>
        <div className="no-scrollbar mobile-rail flex snap-x snap-mandatory gap-6 overflow-x-auto [--rail-item:85%] max-md:gap-4">
          {events.map((e, i) => (
            <article
              key={i}
              className="flex w-[85vw] max-w-[31.6875rem] shrink-0 snap-start flex-col gap-6 rounded-3xl border-[0.5px] border-[#cecece] bg-white p-6 md:h-[39.375rem] md:w-[31.6875rem]"
            >
              <div className="relative aspect-[459/290] w-full md:aspect-auto md:flex-1">
                <img loading="lazy" src={img(e.image, 960)} alt="" className="absolute inset-0 size-full rounded-2xl object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                {e.tag && (
                  <div>
                    <Chip>{e.tag}</Chip>
                  </div>
                )}
                <h3 className="text-xl/7 font-medium tracking-[-0.009375rem] text-ink md:text-h5">{e.title}</h3>
              </div>
              <p className="text-base text-ink md:text-h6">{e.description}</p>
              <div>
                <LinkArrow href={e.cta?.href ?? "/#contact"}>{e.cta?.label ?? "Register Now"}</LinkArrow>
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <Button href="/#events" variant="secondary">
            View More Events
          </Button>
        </div>
      </div>
    </section>
  );
}
