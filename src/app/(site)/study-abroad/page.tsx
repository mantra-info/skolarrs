import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import SiteFaq from "@/components/SiteFaq";
import PageHero from "@/components/PageHero";
import PromoBanner from "@/components/PromoBanner";
import StepFlow from "@/components/StepFlow";
import Testimonials from "@/components/Testimonials";
import UnlockBanner from "@/components/UnlockBanner";
import Events from "@/components/home/Events";
import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { COUNTRY_LIST, type CountryCard } from "@/sanity/lib/queries";

export const metadata: Metadata = { title: "Study Abroad" };

const WHY = [
  { title: "Global Exposure", body: "Study in an international academic environment.", color: "#1d7afc", icon: "icon-country" },
  { title: "Specialized Programs", body: "Access niche and industry-focused postgraduate courses.", color: "#e2483d", icon: "icon-study" },
  { title: "Career Opportunities", body: "Build skills aligned with international industries.", color: "#e2b203", icon: "icon-job" },
  { title: "Global Network", body: "Connect with students, academics and professionals worldwide.", color: "#22a06b", icon: "icon-peoples" },
  { title: "Future Ready Skills", body: "Learn through modern curricula and global practices.", color: "#8270db", icon: "icon-study" },
];

const SPECIALIZATIONS = [
  { title: "Business & Management", body: "MBA | International Business | Finance | Marketing | Supply Chain", bg: "#0055cc", icon: "icon-country" },
  { title: "Technology", body: "Computer Science | AI | Data Science | Cybersecurity | Software Engineering", bg: "#006c7f", icon: "icon-country" },
  { title: "Engineering", body: "Mechanical | Civil | Electrical | Electronics | Industrial Engineering", bg: "#e56910", icon: "icon-engineering" },
  { title: "Healthcare", body: "Public Health | Healthcare Management | Biotechnology | Biomedical Sciences", bg: "#22a06b", icon: "icon-health" },
  { title: "Arts & Social Sciences", body: "Psychology | International Relations | Economics | Media", bg: "#6e5dc6", icon: "icon-science" },
  { title: "Life Sciences", body: "Biotechnology | Microbiology | Molecular Biology", bg: "#2898bd", icon: "icon-microscope" },
];

const ABROAD_STEPS = [
  { title: "Free Consultation", body: "Discuss your goals, interests, and budget with our expert counselors.", color: "#e56910" },
  { title: "Course & University Selection", body: "Receive personalized recommendations tailored to your profile.", color: "#8270db" },
  { title: "Application Submission", body: "Prepare and submit strong applications to selected universities.", color: "#42b2d7" },
  { title: "Offer Letter & Admission", body: "Secure admission from your preferred institution.", color: "#22a06b" },
  { title: "Visa Processing", body: "Complete documentation and obtain your student visa.", color: "#e2483d" },
  { title: "Fly & Start Your Journey", body: "Begin your international education experience with confidence.", color: "#cf9f02" },
];

export default async function StudyAbroadPage() {
  const countries = await sanityFetch<CountryCard[]>({ query: COUNTRY_LIST, tags: ["country"] });
  return (
    <>
      <PageHero
        background="#083abc"
        textTop={302}
        backdrop={
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img loading="lazy" src="/abroad/hero.webp" alt="" className="absolute top-[-8.8%] left-0 h-[160.2%] w-full max-w-none object-cover" />
          </div>
        }
        title="Helping Students Reach Top Universities Worldwide"
        cta={{ label: "Book Your Seat Now", href: "/#contact" }}
      />

      <section className="bg-[#e9f2ff] py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">Why Stop at a Degree?</h2>
            <p className="bg-[linear-gradient(to_top,#5ca9ff,#083abc)] bg-clip-text text-[2.5rem]/[3.25rem] font-bold tracking-[-0.03125rem] text-transparent md:text-[3.5rem]/[4.25rem]">
              Go Further
            </p>
          </div>
          <p className="text-center text-base text-[#3c3c3c] md:text-h6">
            A post graduate degree abroad can open doors to global opportunities and a future without limits
          </p>
          <div className="mobile-rail grid w-full gap-5 [--rail-item:75%] max-md:gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="relative flex flex-col items-center gap-[3.75rem] rounded-2xl border-x-[0.5px] border-b-[10px] bg-white pb-6"
                style={{ borderColor: w.color }}
              >
                <div className="relative h-[17.1875rem] w-full overflow-hidden rounded-2xl">
                  <img loading="lazy" src={`/abroad/why${i + 1}.webp`} alt="" className="absolute inset-0 size-full object-cover" />
                </div>
                <span
                  className="absolute top-[13.6875rem] left-1/2 flex size-[5.75rem] -translate-x-1/2 items-center justify-center rounded-full border-8 border-white"
                  style={{ backgroundColor: w.color }}
                >
                  <img loading="lazy" src={`/abroad/${w.icon}.svg`} alt="" className="size-[3.8125rem]" />
                </span>
                <div className="flex flex-col items-center gap-5 p-4 text-center">
                  <h3 className="text-h5 font-semibold whitespace-nowrap text-ink max-md:whitespace-normal">{w.title}</h3>
                  <p className="text-label text-[#3c3c3c]">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x flex flex-col items-center gap-10 py-16 md:py-20">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">Find Your Abroad Study Destinations</h2>
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-[2.3125rem] lg:grid-cols-4">
          {countries.map((c) => (
            <Link key={c.slug} href={`/study-abroad/${c.slug}`} className="group flex flex-col items-center gap-3 md:gap-6">
              <div className="relative h-[8.75rem] w-full overflow-hidden rounded-2xl sm:h-[12rem] md:h-[17.5625rem] md:rounded-3xl">
                <img loading="lazy" src={img(c.cardImage, 800)} alt={`Study in ${c.name}`} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <span className="flex items-center gap-2 text-center text-sm font-medium text-ink group-hover:text-royal md:text-h6">
                <img loading="lazy" src={img(c.flag)} alt="" className="size-5 shrink-0 md:size-[1.5625rem]" />
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-10">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">What’s Your Next Specialization?</h2>
          <p className="text-center text-base text-[#3c3c3c] md:text-h6">
            A post graduate degree abroad can open doors to global opportunities and a future without limits
          </p>
          <div className="mobile-rail grid w-full gap-5 [--rail-item:88%] max-md:gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SPECIALIZATIONS.map((s, i) => (
              <div key={s.title} className="relative flex h-[18.5625rem] items-end overflow-hidden rounded-3xl p-6" style={{ backgroundColor: s.bg }}>
                <img loading="lazy" src="/abroad/spec/ring.svg" alt="" className="pointer-events-none absolute top-[8rem] left-[-5.3125rem] size-[20.0625rem] max-w-none" />
                <div className="relative flex w-[16.3125rem] flex-col gap-5 py-4 text-white">
                  <h3 className="text-h5 font-semibold">{s.title}</h3>
                  <p className="text-label font-medium">{s.body}</p>
                </div>
                <img loading="lazy" src={`/abroad/spec/p${i + 1}.webp`} alt="" className="absolute top-[-0.3125rem] left-[18.2188rem] size-[19.25rem] max-w-none" />
                <span className="absolute top-6 left-6 flex size-[3.9375rem] items-center justify-center rounded-full bg-white">
                  <img loading="lazy" src={`/abroad/spec/${s.icon}.svg`} alt="" className="size-10" />
                </span>
              </div>
            ))}
          </div>
          <Button href="/study-india">Find Your Program</Button>
        </div>
      </section>

      <UnlockBanner
        title="Unlock a World of Opportunities"
        body="Studying abroad is more than earning a degree—it's an investment in your future. Gain access to globally recognized qualifications, advanced learning environments, and career opportunities that extend beyond borders."
        stats={[
          { value: "1500+", label: "University Tie-ups" },
          { value: "26+", label: "Years of Experience" },
          { value: "100%", label: "Visa Success Rate" },
        ]}
        image="/abroad/unlock-student.webp"
      />

      <StepFlow title="Your Study Abroad Journey" steps={ABROAD_STEPS} />
      <Testimonials />
      <Events />
      <SiteFaq page="study-abroad" />
      <PromoBanner src="/abroad/promo.webp" alt="Study Abroad — Explore. Learn. Build your future." />
    </>
  );
}
