import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CenteredHero from "@/components/CenteredHero";
import CourseTabs from "@/components/college/CourseTabs";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { seoMetadata } from "@/sanity/lib/metadata";
import { COLLEGE, COLLEGE_SLUGS, type College } from "@/sanity/lib/queries";

type Params = { params: Promise<{ slug: string }> };

const getCollege = (slug: string) => sanityFetch<College | null>({ query: COLLEGE, params: { slug }, tags: ["university", "courseCategory", "testimonial"] });

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: COLLEGE_SLUGS, tags: ["university"] });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = await getCollege((await params).slug);
  return c ? seoMetadata(c.seo, c.name) : {};
}

const C = "/college";

/** Icons for the Vision / Mission / Values cards, in that order. */
const PILLAR_ICONS = [
  { icon: `${C}/icon-vision.svg`, w: 51, h: 63 },
  { icon: `${C}/icon-mission.svg`, w: 52, h: 64 },
  { icon: `${C}/icon-values.svg`, w: 50, h: 61 },
];


const FEATURES = [
  { title: "Strong Technical Foundation", body: "Develop a solid understanding of engineering principles, technology, mathematics, and scientific concepts.", icon: "technical" },
  { title: "Practical Learning", body: "Gain hands-on experience through laboratories, projects, workshops, internships, and industry exposure.", icon: "learning" },
  { title: "Innovation & Research", body: "Explore emerging technologies and work on solutions that address real-world problems.", icon: "research" },
  { title: "Industry Exposure", body: "Connect classroom learning with practical applications through internships, projects, industry interactions, and technical events.", icon: "industry" },
  { title: "Global Career Opportunities", body: "Build transferable technical and analytical skills that can open opportunities across industries and markets.", icon: "career" },
  { title: "Diverse Specializations", body: "Choose from traditional engineering disciplines as well as emerging fields such as AI, robotics, data science, and renewable energy.", icon: "specialization" },
];


export default async function CollegePage({ params }: Params) {
  const c = await getCollege((await params).slug);
  if (!c) notFound();
  const [mainPhoto, ...sidePhotos] = c.campusGallery ?? [];
  const short = c.name.split(",")[0];

  return (
    <>
      <CenteredHero
        image={img(c.heroImage, 2000)}
        crumbs={[
          { label: "Study India", href: "/study-india" },
          ...(c.category ? [{ label: c.category.title, href: `/study-india/${c.category.slug}` }] : []),
          { label: c.name },
        ]}
        title={c.name}
      />

      <section className="container-x flex flex-col gap-10 py-16 md:py-[6.25rem]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
          <div className="flex flex-col items-start gap-[2.625rem] lg:w-[49.25rem] lg:shrink-0">
            <div className="flex flex-col gap-[2.6875rem]">
              <h2 className="text-h5 font-semibold text-ink">About {short}</h2>
              <div className="flex flex-col gap-[1.875rem] text-base text-[#3c3c3c] md:text-h6">
                {c.about?.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <Button href="/#contact" variant="secondary">
              Apply Now
            </Button>
          </div>
          {c.aboutImage && (
            <div className="relative min-h-[20rem] flex-1 overflow-hidden rounded-xl">
              <img loading="lazy" src={img(c.aboutImage, 1400)} alt={`${c.name} campus`} className="absolute inset-0 size-full object-cover" />
            </div>
          )}
        </div>

        {!!c.pillars?.length && (
        <div className="flex flex-col gap-4 rounded-2xl bg-[#e9f2ff] p-4 md:flex-row md:gap-10">
          {c.pillars.map((p, i) => (
            <div key={p.title} className="flex flex-1 items-stretch gap-10">
              {i > 0 && <span className="hidden w-px bg-[#b6c2cf] md:block" />}
              <div className="flex flex-col gap-4 p-4">
                {PILLAR_ICONS[i] && (
                  <img loading="lazy" src={PILLAR_ICONS[i].icon} alt="" style={{ width: `${PILLAR_ICONS[i].w / 16}rem`, height: `${PILLAR_ICONS[i].h / 16}rem` }} />
                )}
                <div className="flex flex-col gap-7">
                  <h3 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-[#09326c] md:text-h4">{p.title}</h3>
                  <p className="text-base text-[#3c3c3c] md:text-h6">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 lg:flex lg:items-stretch lg:justify-between">
          {c.stats?.map((s, i) => (
            <div key={s.label} className="flex items-stretch gap-8">
              {i > 0 && <span className="hidden w-px bg-[#d9d9d9] lg:block" />}
              <div className="flex items-start gap-2 sm:gap-5">
                <img loading="lazy" src={`${C}/icon-stat.svg`} alt="" className="size-8 shrink-0 sm:size-[3.25rem]" />
                <div>
                  <p className="text-[1.625rem]/8 font-bold tracking-[-0.01875rem] text-ink sm:text-[2rem]/10 md:text-h3">{s.value}</p>
                  <p className="text-sm text-[#777] sm:text-h6">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#163e78] py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-10">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-white md:text-h3">More than a Degree, A Bright Future</h2>
          <p className="text-center text-base text-[#e8e8e8] md:text-h6">
            Engineering education combines mathematics, science, technology, creativity, and practical problem-solving to prepare students for real-world
            challenges.
          </p>
          <div className="mobile-rail grid w-full gap-5 [--rail-item:85%] max-md:gap-3 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-6 rounded-[2rem] border-[0.5px] border-[#ccd2dc] bg-[rgba(247,248,249,0.09)] px-7 py-6 max-md:gap-4 max-md:px-5">
                <img loading="lazy" src={`${C}/icons/${f.icon}.webp`} alt="" className="size-[3.75rem] shrink-0 md:size-20" />
                <div className="flex flex-col gap-6 max-md:min-w-0 max-md:gap-3">
                  <h3 className="text-h5 font-semibold text-white max-md:text-xl max-md:[overflow-wrap:anywhere]">{f.title}</h3>
                  <p className="text-label text-[#cecece]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x flex flex-col gap-10 py-16 md:py-20 lg:flex-row lg:gap-[4.5rem]">
        <div className="flex flex-col items-start gap-10 lg:w-[31.5625rem] lg:shrink-0">
          <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">A Vibrant Campus Beyond Academics</h2>
          <p className="text-base text-[#777] md:text-h6">
            Experience a campus that inspires learning, creativity and personal growth. From modern facilities to exciting clubs offers a vibrant college life.
          </p>
          <Button href="/#contact" variant="secondary">
            Explore Gallery
          </Button>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-6 lg:h-[36.4375rem]">
          {mainPhoto && (
            <div className="relative min-h-[18.75rem] overflow-hidden rounded-xl">
              <img loading="lazy" src={img(mainPhoto, 1200)} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {sidePhotos.slice(0, 3).map((photo, n) => (
              <div key={n} className="relative min-h-[5.625rem] flex-1 overflow-hidden rounded-xl">
                <img loading="lazy" src={img(photo, 800)} alt="" className="absolute inset-0 size-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {!!(c.ugProgrammes?.length || c.pgProgrammes?.length) && (
        <CourseTabs
          title={c.category ? `Top Courses - ${c.category.title}` : "Top Courses"}
          ug={(c.ugProgrammes ?? []).map((p) => ({ title: p.title, body: p.body ?? "" }))}
          pg={(c.pgProgrammes ?? []).map((p) => ({ title: p.title, body: p.body ?? "" }))}
        />
      )}

      {c.reviews.length > 0 && (
      <section className="overflow-hidden bg-white py-16 md:py-20">
        <div className="container-x flex flex-col gap-6">
          <div className="flex flex-col gap-6 pb-5">
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Real Stories, Real Success</h2>
            <p className="text-label text-[#3c3c3c]">
              Our expert guidance has helped students confidently secure seats at top colleges, navigate complex admissions, and achieve their dream careers —
              stress-free and on time.
            </p>
          </div>
          <div className="no-scrollbar mobile-rail flex snap-x gap-6 overflow-x-auto [--rail-item:85%] max-md:gap-3">
            {c.reviews.map((r) => (
              <figure key={r.name} className="flex w-[20rem] shrink-0 snap-start flex-col gap-7 rounded-2xl bg-[#e9f2ff] p-5 md:w-[29rem]">
                <div className="flex items-center gap-1 text-h6 font-medium text-ink">
                  <img loading="lazy" src={`${C}/star.svg`} alt="" className="size-6" />
                  {r.rating?.toFixed(1)}
                </div>
                <blockquote className="text-base leading-7 text-ink md:text-lg/7">{r.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex size-[3.125rem] items-center justify-center rounded-full bg-[linear-gradient(to_top,#5ca9ff,#083abc)] text-h6 font-semibold text-white">
                    {r.name.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-h5 font-semibold text-ink">{r.name}</span>
                    <span className="text-label text-[#3c3c3c]">{r.course}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
