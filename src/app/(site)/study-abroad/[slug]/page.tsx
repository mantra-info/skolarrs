import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Button from "@/components/Button";
import ContactSection from "@/components/ContactSection";
import SiteFaq from "@/components/SiteFaq";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import VectorIcon from "@/components/VectorIcon";
import WhySkolarrs from "@/components/WhySkolarrs";
import CostTabs from "@/components/country/CostTabs";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { seoMetadata } from "@/sanity/lib/metadata";
import { COUNTRY, COUNTRY_SLUGS, type Country } from "@/sanity/lib/queries";
import { countryThemeVars } from "@/sanity/schemaTypes/presets";

type Params = { params: Promise<{ slug: string }> };

const getCountry = (slug: string) => sanityFetch<Country | null>({ query: COUNTRY, params: { slug }, tags: ["country", "university"] });

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: COUNTRY_SLUGS, tags: ["country"] });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const country = await getCountry((await params).slug);
  return country ? seoMetadata(country.seo, `Study in ${country.name}`) : { title: "Study Abroad" };
}

const I = "/icons/why";
const WHY_POINTS: { label: string; layers: [string, string][] }[] = [
  { label: "World Class Education", layers: [[`${I}/edu-a.svg`, "20.7% 17.82% 23.63% 5.86%"], [`${I}/edu-b.svg`, "6.06% 0"]] },
  { label: "Affordable Tuition", layers: [[`${I}/tuition-a.svg`, "5.86% 0 6.05% 0"], [`${I}/tuition-b.svg`, "0"]] },
  { label: "Post Graduation Work Opportunities", layers: [[`${I}/job-a.svg`, "16.31% 0 25.1% 0"], [`${I}/job-b.svg`, "7.52% 0"]] },
  { label: "Safe & Healthy Living", layers: [[`${I}/living-a.svg`, "2.91% 8.98% 0 8.98%"], [`${I}/living-b.svg`, "0 3.12% 5.86% 3.12%"]] },
  { label: "Internship Opportunities", layers: [[`${I}/internship.svg`, "0"]] },
  { label: "Pathway for Permanent Residency", layers: [[`${I}/resident-a.svg`, "3.13% 0 3.13% 5.86%"], [`${I}/resident-b.svg`, "14.84% 6.05% 3.13% 0"]] },
];

function H2({ children, color = "var(--color-ink)", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return <h2 style={{ color }} className={`text-center text-[1.625rem]/8 font-bold tracking-[-0.0125rem] md:text-h4 ${className}`}>{children}</h2>;
}

function Lead({ children, color = "#3c3c3c" }: { children: React.ReactNode; color?: string }) {
  return <p style={{ color }} className="text-center text-base md:text-h6">{children}</p>;
}

function EligibilityCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-12 rounded-3xl border-[0.5px] border-[#fd9891] bg-white p-7">
      <h3 className="text-h6 font-semibold text-[#0b218c]">{title}</h3>
      <div className="flex flex-col gap-3 text-label text-ink">{children}</div>
    </div>
  );
}

function Level({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-h6 font-semibold text-[#e2483d]">{name}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default async function CountryPage({ params }: Params) {
  const { slug } = await params;
  const country = await getCountry(slug);
  if (!country) notFound();
  // Countries without page content yet show just the hero, shared sections and contact form.
  const d = country.whyBody ? country : null;
  const name = country.name;

  return (
    <div style={countryThemeVars(country.colors) as React.CSSProperties}>
      <section className="relative h-[42.5rem] overflow-hidden bg-royal md:h-[37.5rem] lg:h-[50rem]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={img(country.heroImage ?? country.cardImage, 2000)} alt="" className="absolute inset-0 size-full object-cover" />
          {!d && <div className="absolute inset-0 bg-black/40" />}
        </div>
        <div className="container-x relative flex h-full flex-col items-center justify-center pt-24 text-center lg:justify-start lg:pt-[14.5rem]">
          <nav aria-label="Breadcrumb" className="flex items-center text-base font-medium text-white">
            <Link href="/study-abroad" className="px-1 py-2.5 text-[#fdfdfd] hover:underline">
              Study Abroad
            </Link>
            <span className="px-1 py-2.5">/</span>
            <span className="px-1 py-2.5">{name}</span>
          </nav>
          <div className="flex w-[48.4375rem] max-w-full flex-col items-center gap-[1.625rem]">
            <h1 className="text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] text-white md:text-h2">
              Study in {name}:
              <br />
              Top Universities, Courses, Cost,
              <br />
              Scholarships &amp; more
            </h1>
            <Button href="/#contact">Book Your Seat Now</Button>
          </div>
        </div>
      </section>

      {d && (
        <>
          <section className="container-x flex flex-col gap-12 py-16 md:py-20 lg:flex-row lg:justify-between lg:gap-[6.25rem]">
            <div className="flex flex-col items-start gap-[2.6875rem] lg:w-[39.625rem]">
              <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Why Study in {name}?</h2>
              <p className="text-base text-[#3c3c3c] md:text-h6">{d.whyBody}</p>
              <Button href="/#contact" variant="secondary">
                Apply Now
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[45.5rem]">
              {WHY_POINTS.map((p) => (
                <div key={p.label} className="flex min-h-[9.375rem] flex-col items-center justify-center gap-6 rounded-[2rem] border-[0.5px] border-[#909bd3] bg-[#fafbfd] p-6 text-center">
                  <VectorIcon layers={p.layers} className="size-[3.125rem]" />
                  <p className="text-label font-medium text-ink">{p.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="[background:var(--theme-section)] py-16 md:py-20">
            <div className="container-x flex flex-col items-center gap-12">
              <H2 color="var(--theme-section-text, #fff)">Popular Universities in {name}</H2>
              <Lead color="var(--theme-section-text, #fff)">{d.universitiesBody}</Lead>
              <div className="grid w-full gap-3 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-5">
                {d.universities?.map((u) => (
                  <Link
                    key={u.name}
                    href={u.hasDetailPage ? `/colleges/${u.slug}` : "/#contact"}
                    className="group flex h-[5.9375rem] items-center gap-5 rounded-3xl border-[0.5px] border-[#e3e3e3] bg-white px-5 py-2 transition hover:shadow-lg"
                  >
                    <img loading="lazy" src={img(u.logo, 400)} alt="" className="h-12 w-[7.5rem] shrink-0 object-contain" />
                    <span className="flex-1 text-label font-medium text-grey-500">{u.name}</span>
                    <img loading="lazy" src="/icons/arrow-uni.svg" alt="" className="size-6 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="container-x flex flex-col items-center gap-12 py-16 md:py-20">
            <H2>Top Courses in {name}</H2>
            <Lead>{d.coursesBody}</Lead>
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {d.courses?.map((c) => (
                <div key={c} className="flex h-[5.9375rem] items-center justify-center rounded-3xl border-[0.5px] border-[color:var(--theme-course-border)] bg-[color:var(--theme-course-bg)] px-5 text-center text-h6 font-medium text-[color:var(--theme-course-text)]">
                  {c}
                </div>
              ))}
            </div>
          </section>

          {d.eligibility && d.eligibility.length > 0 && (
            <section className="[background:var(--theme-eligibility)] py-16 md:py-20">
              <div className="container-x flex flex-col items-center gap-12">
                <H2 color="var(--theme-eligibility-text, var(--color-ink))">Eligibility Criteria to Study in {name}</H2>
                <Lead color="var(--theme-eligibility-text, #3c3c3c)">{d.eligibilityBody}</Lead>
                <div className="flex w-full flex-col gap-6 lg:flex-row">
                  {d.eligibility.map((card) => (
                    <EligibilityCard key={card.title} title={card.title}>
                      {card.levels?.map((level) => (
                        <Level key={level.name} name={level.name}>
                          {level.points && <PortableText value={level.points} />}
                        </Level>
                      ))}
                    </EligibilityCard>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="container-x flex flex-col items-center gap-12 py-16 md:py-20">
            <H2>Exam Requirements to Study in {name}</H2>
            <Lead>{d.examsBody}</Lead>
            <div className="flex w-full max-w-[80.75rem] flex-wrap items-center justify-center gap-10 lg:justify-between">
              <img loading="lazy" src="/exams/ielts.webp" alt="IELTS" className="size-[7.5rem] object-cover md:size-[11.375rem]" />
              <img loading="lazy" src="/exams/toefl.webp" alt="TOEFL" className="h-[5.9375rem] w-[10.25rem] object-cover md:h-[8.9375rem] md:w-[15.4375rem]" />
              <img loading="lazy" src="/exams/pte.webp" alt="Pearson PTE" className="h-[7.0625rem] w-[12.5625rem] object-cover md:h-[10.625rem] md:w-[18.875rem]" />
              <img loading="lazy" src="/exams/duolingo.webp" alt="Duolingo English Test" className="h-[7rem] w-[5.625rem] object-cover md:h-[10.5625rem] md:w-[8.4375rem]" />
            </div>
          </section>

          <section className="relative overflow-hidden [background:var(--theme-cost)] py-16 md:py-20">
            <div className="pointer-events-none absolute inset-[0.13%_55.8%_-83.86%_-53.58%] opacity-15">
              <img loading="lazy" src="/country/cost-linework.svg" alt="" className="absolute inset-0 size-full [filter:var(--theme-cost-art,none)]" />
            </div>
            <div className="pointer-events-none absolute inset-[-4.92%_-20.98%_2.39%_79.02%] hidden items-center justify-center lg:flex" style={{ containerType: "size" }}>
              <img loading="lazy" src="/country/plane-right.svg" alt="" className="h-[hypot(42.4964cqw,-39.958cqh)] w-[hypot(-57.5036cqw,-60.042cqh)] max-w-none flex-none rotate-[-133.5deg] [filter:var(--theme-cost-art,none)]" />
            </div>
            <div className="pointer-events-none absolute inset-[-23.83%_90.48%_21.3%_-32.44%] hidden items-center justify-center lg:flex" style={{ containerType: "size" }}>
              <img loading="lazy" src="/country/plane-left.svg" alt="" className="h-[hypot(-42.4964cqw,39.958cqh)] w-[hypot(57.5036cqw,60.042cqh)] max-w-none flex-none rotate-[46.5deg] [filter:var(--theme-cost-art,none)]" />
            </div>
            <div className="container-x relative flex flex-col items-center gap-12">
              <H2 color="var(--theme-cost-text, #fff)">Cost of Studying in {name}</H2>
              <p className="text-center text-base font-medium text-[color:var(--theme-cost-text,#e8e8e8)] md:text-h6">{d.costBody}</p>
              <CostTabs study={d.costOfStudy ?? []} living={d.costOfLiving ?? []} />
            </div>
          </section>

          <section className="container-x flex flex-col items-center gap-12 py-16 md:py-20">
            <H2 className="max-w-[40rem]">Application Requirements to Study in {name}</H2>
            <Lead>{d.applicationBody}</Lead>
            <div className="flex w-full flex-wrap justify-center gap-5">
              {d.requirements?.map((r) => (
                <div
                  key={r.title}
                  className="flex w-full flex-col items-start gap-6 rounded-[2rem] border-[0.5px] border-[#dcdfe4] bg-[#f7f8f9] px-7 py-6 sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] lg:min-w-[18.75rem] lg:min-h-[23.875rem]"
                >
                  <span className="flex items-center rounded-full bg-white p-6">
                    <img loading="lazy" src="/country/icon-application.svg" alt="" className="size-[2.375rem]" />
                  </span>
                  <h3 className="text-h5 font-medium text-ink">{r.title}</h3>
                  <p className="text-label text-[#3c3c3c]">{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <WhySkolarrs />
      <Testimonials />
      <SiteFaq page="country" />
      {d?.promo ? <PromoBanner wide src={img(d.promo, 2000)} alt={d.promo.alt ?? `Your future starts in ${name}`} crop="inset-0 h-full object-cover" /> : <ContactSection />}
    </div>
  );
}
