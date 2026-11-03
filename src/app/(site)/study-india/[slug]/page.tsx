import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CenteredHero from "@/components/CenteredHero";
import SiteFaq from "@/components/SiteFaq";
import Testimonials from "@/components/Testimonials";
import UniversityList from "@/components/UniversityList";
import WhySkolarrs from "@/components/WhySkolarrs";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { seoMetadata } from "@/sanity/lib/metadata";
import { COURSE_CATEGORY, COURSE_CATEGORY_SLUGS, type CourseCategory, uniItems } from "@/sanity/lib/queries";

type Params = { params: Promise<{ slug: string }> };

const getCategory = (slug: string) => sanityFetch<CourseCategory | null>({ query: COURSE_CATEGORY, params: { slug }, tags: ["courseCategory", "university"] });

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: COURSE_CATEGORY_SLUGS, tags: ["courseCategory"] });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = await getCategory((await params).slug);
  return c ? seoMetadata(c.seo, c.title) : {};
}

export default async function CourseCategoryPage({ params }: Params) {
  const c = await getCategory((await params).slug);
  if (!c) notFound();

  return (
    <>
      <CenteredHero
        slides={c.heroSlides?.map((s) => img(s, 2000))}
        crumbs={[{ label: "Study India", href: "/study-india" }, { label: c.title }]}
        title={c.heroTitle ?? c.title}
      />

      <section className="container-x flex flex-col items-start gap-[2.6875rem] py-16 md:py-20">
        <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-ink md:text-h4">About {c.title}</h2>
        <p className="text-base text-[#3c3c3c] md:text-h6">{c.aboutBody}</p>
        <Button href="/#contact" variant="secondary">
          Apply Now
        </Button>
        {!!c.benefits?.length && (
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.benefits.map((a) => (
              <div key={a.title} className="flex flex-col gap-[2.6875rem] rounded-3xl bg-[#f7f8f9] p-4">
                <div className="relative h-[15.625rem] overflow-hidden rounded-2xl">
                  <img loading="lazy" src={img(a.image, 800)} alt="" className="absolute inset-0 size-full object-cover" />
                </div>
                <h3 className="text-h5 font-semibold text-ink">{a.title}</h3>
                <p className="text-base text-[#3c3c3c] md:text-h6">{a.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {!!c.trending?.length && (
        <section className="bg-[#e9f2ff] py-16 md:py-20">
          <div className="container-x flex flex-col gap-[2.6875rem]">
            <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-ink md:text-h4">Trending {c.title} courses</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.trending.map((t) => (
                <div key={t.title} className="flex flex-col gap-[2.6875rem] rounded-3xl border-[0.5px] border-[#b6c2cf] bg-white p-4">
                  <div className="relative h-[15.625rem] overflow-hidden rounded-2xl">
                    <img loading="lazy" src={img(t.image, 800)} alt="" className="absolute inset-0 size-full object-cover" />
                  </div>
                  <p className="max-w-[17.5625rem] text-label font-medium text-ink">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!c.universities?.length && <UniversityList wide title={`Popular ${c.title} Universities in India`} items={uniItems(c.universities)} pageSize={10} />}

      {c.promo && (
        <section className="container-x py-[3.75rem]">
          <div className="relative aspect-[1559/521] w-full overflow-hidden rounded-2xl">
            <img loading="lazy" src={img(c.promo, 2000)} alt={c.promo.alt ?? ""} className="absolute inset-0 size-full object-cover" />
          </div>
        </section>
      )}

      <WhySkolarrs />
      <Testimonials />
      <SiteFaq page="course" />
    </>
  );
}
