import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CenteredHero from "@/components/CenteredHero";
import IntroPoints from "@/components/IntroPoints";
import PromoBanner from "@/components/PromoBanner";
import UniversityList from "@/components/UniversityList";
import WhyAccordion from "@/components/WhyAccordion";
import * as ICONS from "@/data/icons";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { seoMetadata } from "@/sanity/lib/metadata";
import { MBBS, MBBS_SLUGS, type Mbbs, uniItems } from "@/sanity/lib/queries";

type Params = { params: Promise<{ slug: string }> };

const getDestination = (slug: string) => sanityFetch<Mbbs | null>({ query: MBBS, params: { slug }, tags: ["mbbsDestination", "university"] });

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: MBBS_SLUGS, tags: ["mbbsDestination"] });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const d = await getDestination((await params).slug);
  return d ? seoMetadata(d.seo, d.region === "abroad" ? `MBBS in ${d.name}` : d.name) : {};
}

const iconLayers = (key?: string) => ICONS[(key ?? "ICON_EDUCATION") as keyof typeof ICONS] ?? ICONS.ICON_EDUCATION;

export default async function MbbsDestinationPage({ params }: Params) {
  const d = await getDestination((await params).slug);
  if (!d) notFound();
  const title = d.region === "abroad" ? `MBBS in ${d.name}` : d.name;

  return (
    <>
      <CenteredHero
        image={img(d.heroImage, 2000)}
        crumbs={[{ label: d.region === "abroad" ? "Abroad" : "India", href: "/study-mbbs" }, { label: d.name }]}
        title={title}
      />

      {d.introTitle && (
        <IntroPoints small title={d.introTitle} points={(d.keyPoints ?? []).map((p) => ({ label: p.label, layers: iconLayers(p.icon) }))}>
          <p>{d.introBody}</p>
        </IntroPoints>
      )}

      {!!d.universities?.length && (
        <UniversityList title={d.universitiesTitle ?? `Popular Universities in ${d.name}`} items={uniItems(d.universities)} radius="rounded-lg" pageSize={10} />
      )}

      {!!d.fees?.length && (
        <section className="bg-secondary-gradient py-16 md:py-20">
          <div className="container-x flex flex-col gap-12">
            <h2 className="text-[1.875rem]/[2.375rem] font-semibold tracking-[-0.01875rem] text-ink md:text-h3">Tuition Fee Range</h2>
            <div className="mobile-rail grid gap-5 [--rail-item:85%] max-md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {d.fees.map((q, i) => (
                <div key={q.title} className="flex flex-col gap-6 rounded-2xl border-[0.5px] border-[#cecece] bg-white p-6">
                  <div className="flex items-center gap-2">
                    <span className="relative size-10 shrink-0 overflow-hidden">
                      <img loading="lazy" src={i === 0 ? "/private/icon-quota-govt.svg" : "/private/icon-quota.svg"} alt="" className="absolute top-0 left-[4.1%] h-full w-[91.8%]" />
                    </span>
                    <h3 className="text-h5 font-bold text-ink">{q.title}</h3>
                  </div>
                  <span className="h-px w-full bg-[#d9d9d9]" />
                  <ul className="flex flex-col gap-3 text-h6 font-medium text-[#3c3c3c]">
                    {[q.fee, q.route].filter(Boolean).map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <img loading="lazy" src="/icons/pointer-click.svg" alt="" className="mt-[0.1875rem] size-6 shrink-0 -scale-y-100 rotate-180" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!d.whyItems?.length && d.whyImage && (
        <WhyAccordion image={img(d.whyImage, 1400)} items={d.whyItems.map((w) => ({ title: w.title, body: w.body ?? "" }))} />
      )}

      {d.promo && <PromoBanner src={img(d.promo, 2000)} alt={d.promo.alt ?? title} crop="inset-0 h-full object-cover" />}
    </>
  );
}
