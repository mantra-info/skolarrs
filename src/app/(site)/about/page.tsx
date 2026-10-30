import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import VectorIcon from "@/components/VectorIcon";

export const metadata: Metadata = { title: "About Us" };

const VISA_ICON: [string, string][] = [
  ["/about/visa/v1.svg", "50% 8.15% 1.46% 8.15%"],
  ["/about/visa/v2.svg", "1.46% 8.15% 50% 8.15%"],
  ["/about/visa/v3.svg", "50% 8.15% 1.46% 83.21%"],
  ["/about/visa/v4.svg", "1.46% 8.15% 50% 83.21%"],
  ["/about/visa/v5.svg", "56.35% 57.77% 7.81% 15.53%"],
  ["/about/visa/v6.svg", "56.35% 57.77% 7.81% 37.1%"],
  ["/about/visa/v7.svg", "63.86% 62.52% 12.46% 20.28%"],
  ["/about/visa/v8.svg", "67.83% 62.52% 12.46% 28.63%"],
  ["/about/visa/v9.svg", "66.42% 63.03% 17.72% 20.79%"],
  ["/about/visa/v10.svg", "66.42% 63.03% 17.72% 27.19%"],
  ["/about/visa/v11.svg", "60.99% 62.52% 28.15% 20.28%"],
  ["/about/visa/v12.svg", "60.99% 62.52% 28.15% 27.19%"],
  ["/about/visa/v13.svg", "0 6.68% 0 6.68%"],
];

const MISSION_ICON: [string, string][] = [
  ["/about/mission/m0.svg", "6.67% 6.67% 70% 66.67%"],
  ["/about/mission/m1.svg", "6.67% 6.67% 70% 81.72%"],
  ["/about/mission/m2.svg", "6.67% 18.71% 72.04% 66.67%"],
  ["/about/mission/m3.svg", "0 23.33% 76.67% 51.02%"],
  ["/about/mission/m4.svg", "0 46.67% 50% 46.67%"],
  ["/about/mission/m5.svg", "0 46.67% 50% 48.71%"],
  ["/about/mission/m6.svg", "71.64% 0 0 0"],
  ["/about/mission/m7.svg", "72.49% 0 0 78.48%"],
  ["/about/mission/m8.svg", "61.34% 15.22% 21.21% 15.22%"],
  ["/about/mission/m9.svg", "61.34% 15.22% 21.72% 72.46%"],
  ["/about/mission/m10.svg", "53.17% 13.84% 0 11.4%"],
  ["/about/mission/m11.svg", "58.76% 11.4% 0 57.88%"],
  ["/about/mission/g0.svg", "36.67% 13.33% 46.67% 13.33%"],
  ["/about/mission/g1.svg", "36.67% 13.33% 46.67% 19.33%"],
  ["/about/mission/m12.svg", "43.47% 33.33% 35% 33.33%"],
  ["/about/mission/m13.svg", "41.34% 33.33% 35% 47.69%"],
  ["/about/mission/m14.svg", "33.49% 46.67% 63.49% 46.67%"],
];

function Divider() {
  return <span aria-hidden className="hidden w-px self-stretch bg-[#cecece] lg:block" />;
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        mobileImage="/about/hero-graduate.webp"
        background="#346035"
        backdrop={
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10 mix-blend-darken">
            <img loading="lazy" src="/about/hero-texture.webp" alt="" className="absolute top-[-69.9%] left-0 h-[240.06%] w-full max-w-none" />
          </div>
        }
        title="No.1 Education Consultancy in Coimbatore"
        description="We are the leading overseas educational Consultancy providing services to hundreds of students every year since 2001. Being one of the top educational consultancies in Coimbatore, honoured by students and parents. We are at the forefront to provide the latest information to students aspiring them to study in abroad. We have commendable years of experience working with abroad universities and institutions to provide best education to the Indian students."
        cta={{ label: "Contact Us Now", href: "#contact" }}
        art={
          <div className="absolute top-[10.125rem] left-[69.25rem] h-[39.875rem] w-[34.1875rem] overflow-hidden">
            <img loading="lazy" src="/about/hero-graduate.webp" alt="" className="absolute top-[2.87%] left-0 h-[109.91%] w-full max-w-none" />
          </div>
        }
      />

      <section className="bg-surface pt-[3.75rem]">
        <div className="container-x flex flex-col items-center gap-[2.8125rem] lg:flex-row lg:justify-center">
          <div className="relative aspect-square w-full max-w-[37.75rem] shrink-0">
            <img loading="lazy" src="/about/student.webp" alt="Smiling student giving a thumbs up" className="absolute inset-0 size-full object-cover" />
            <VectorIcon layers={VISA_ICON} className="absolute! top-[5.7%] left-[29.2%] size-[13.4%]" />
            <VectorIcon layers={[["/about/test-icon.svg", "0.61% 0 0.61% 0"]]} className="absolute! top-[46.4%] left-[74.4%] size-[14.6%]" />
          </div>
          <div className="flex max-w-[48.125rem] flex-col gap-10 pb-16 lg:py-20">
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Empowering Students to Achieve Their Academic Dreams</h2>
            <div className="flex flex-col gap-7 text-base leading-7 text-[#3c3c3c] md:text-lg/7">
              <p>
                At Skolarrs Solutions, we believe that education is the foundation of a successful future. As a trusted education consultancy specializing in
                both study abroad and higher education opportunities in India, we are dedicated to helping students discover the right academic pathways that align
                with their ambitions, talents, and career goals.
              </p>
              <p>
                With a student-first approach, we provide comprehensive guidance and personalized support throughout every stage of the educational journey—from
                selecting the ideal course and institution to securing admissions, visas, scholarships, and beyond. Our mission is to simplify the complex process of
                educational planning and empower students to make confident decisions about their future.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary-gradient py-16 md:py-20">
        <div className="container-x flex flex-col gap-16 md:gap-[6.25rem]">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-[3.75rem]">
            <VectorIcon layers={[["/about/vision-icon.svg", "1.56% 7.11% 3.13% 8.52%"]]} className="size-[6.25rem]" />
            <div className="flex flex-1 flex-col gap-5">
              <h2 className="text-h5 font-bold text-ink">Our Vision</h2>
              <p className="text-base text-[#3c3c3c] md:text-h6">
                To become a trusted global education partner that empowers students to achieve their academic and career aspirations through quality guidance,
                innovative solutions, and access to world-class educational opportunities. We envision a future where every student can confidently pursue their
                dreams, whether in India or abroad, and build a successful career without barriers.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-[3.75rem]">
            <VectorIcon layers={MISSION_ICON} className="size-[6.25rem]" />
            <div className="flex flex-1 flex-col gap-5">
              <h2 className="text-h5 font-bold text-ink">Our Mission</h2>
              <p className="text-base text-[#3c3c3c] md:text-h6">
                At Skolarrs Solutions, our mission is to simplify the educational journey for students by providing personalized counseling, transparent guidance,
                and comprehensive support at every stage of the admission process. We are committed to connecting students with the right institutions, programs,
                and opportunities while helping them make informed decisions that shape their future success. Through integrity, expertise, and student-focused
                services, we strive to transform aspirations into achievements and create pathways to lifelong growth and global opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[6.25rem] lg:px-[4.1875rem]">
          <div className="relative h-[28.75rem] flex-1 overflow-hidden rounded-3xl bg-[#083a8c] lg:h-[26.8125rem]">
            <div className="absolute inset-0 bg-[url('/about/founder-texture.webp')] bg-[length:64rem_64rem] bg-top-left opacity-[0.06]" />
            <img loading="lazy" src="/about/founder.webp" alt="Kaleel Sha, Founder & CEO" className="absolute top-[-1.4375rem] left-1/2 h-[33.9375rem] w-[31.875rem] max-w-none -translate-x-1/2 rounded-xl object-bottom lg:left-8 lg:translate-x-0" />
          </div>
          <div className="flex flex-col gap-[1.625rem] lg:w-[45.8125rem]">
            <h2 className="text-[1.625rem]/8 font-bold tracking-[-0.0125rem] text-ink md:text-h4">Founder’s Message</h2>
            <p className="text-base text-[#3c3c3c] md:text-h6">
              At Skolarrs Solutions, we believe that every student deserves access to the right opportunities and guidance to build a successful future. Our
              mission is to simplify the educational journey by providing trusted support, personalized counseling, and expert advice for students aspiring to study
              in India or abroad.
            </p>
            <p className="text-base text-[#3c3c3c] md:text-h6">
              We understand that choosing the right course, university, and career path can be challenging. That&apos;s why our team is committed to helping students
              make informed decisions with confidence and clarity. We take pride in being a part of their journey, guiding them from their first consultation to
              their final admission.
            </p>
            <span className="h-px w-full bg-[#d9d9d9]" />
            <div className="flex flex-col gap-1">
              <p className="text-h5 font-semibold text-[#083a8c]">Kaleel Sha</p>
              <p className="text-label text-ink">Founder &amp; CEO, Skolarrs Solutions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-[3.75rem]">
        <div className="container-x flex flex-col items-center gap-[3.3125rem]">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Awards and Recognitions</h2>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-[5.3125rem]">
            <img loading="lazy" src="/about/cert1.svg" alt="AAERI" className="h-[5.9375rem] w-[5.75rem]" />
            <Divider />
            <img loading="lazy" src="/layout/icef.webp" alt="ICEF" className="h-[5.9375rem] w-[5.0625rem] object-cover" />
            <Divider />
            <img loading="lazy" src="/about/ucas.svg" alt="UCAS" className="h-[2.0625rem] w-[7.0625rem]" />
            <Divider />
            <img loading="lazy" src="/layout/airc.webp" alt="AIRC" className="size-[6.1875rem] object-cover" />
            <Divider />
            <span className="relative size-[6.6875rem] overflow-hidden rounded-full">
              <img loading="lazy" src="/layout/iso.webp" alt="ISO 14001 certified" className="absolute top-[-10%] left-[-10%] size-[120%] max-w-none" />
            </span>
            <Divider />
            <span className="relative h-[6.1875rem] w-[5.6875rem]">
              <img loading="lazy" src="/about/cert2a.svg" alt="AAEA" className="absolute inset-[0_0_21.72%_1.11%]" />
              <img loading="lazy" src="/about/cert2b.svg" alt="" className="absolute inset-[82.86%_0.47%_-0.01%_0]" />
            </span>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Faq />
      <ContactSection />
    </>
  );
}
