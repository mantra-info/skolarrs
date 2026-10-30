import type { Metadata } from "next";
import Faq from "@/components/Faq";
import IntroPoints from "@/components/IntroPoints";
import PageHero from "@/components/PageHero";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import UnlockBanner from "@/components/UnlockBanner";
import Events from "@/components/home/Events";
import DestinationTabs from "@/components/mbbs/DestinationTabs";
import { ICON_EDUCATION, ICON_GLOBAL, ICON_GROWTH, ICON_INNOVATION, ICON_JOB } from "@/data/icons";

export const metadata: Metadata = { title: "Study MBBS" };

const INDIA_POINTS = [
  "Study in a familiar academic and cultural environment.",
  "Admission is primarily through NEET-UG and applicable counselling processes.",
  "Students can choose from government and private medical colleges.",
  "Strong exposure to the Indian healthcare system.",
  "Easier communication with family and familiar support networks.",
  "Clinical training is provided through affiliated hospitals and medical institutions.",
  "Students can build their professional network within India.",
  "Suitable for students planning to pursue their medical career in India.",
  "Competition for medical seats can be very high.",
  "Tuition fees vary considerably between government and private institutions.",
  "No need to adjust to a foreign country, culture, or climate.",
  "Students can pursue postgraduate medical education in India after meeting the applicable requirements.",
];

const ABROAD_POINTS = [
  "Study in an international and multicultural environment.",
  "Offers access to medical universities in multiple countries.",
  "Many universities offer English-medium medical programs.",
  "Admission requirements vary depending on the country and university.",
  "Some destinations may offer comparatively lower tuition fees than private medical colleges in India.",
  "Students gain international exposure and experience living independently.",
  "Medical education may include modern laboratories, hospitals, and clinical facilities.",
  "Students interact with peers from different countries and cultures.",
  "Living expenses vary depending on the destination.",
  "Students need to understand the recognition and licensing requirements before selecting a university.",
  "Graduates planning to practice in India must meet the applicable Indian regulatory and licensing requirements.",
  "Provides an opportunity to experience a different healthcare system and educational environment.",
];

function CompareCard({ title, points, bg, inner, map }: { title: string; points: string[]; bg: string; inner: string; map: string }) {
  return (
    <div className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[2rem] p-5 md:p-7" style={{ backgroundColor: bg }}>
      <img loading="lazy" src={map} alt="" className="pointer-events-none absolute top-[-3.125rem] left-24 h-[32.9375rem] w-[63.0625rem] max-w-none" />
      <h3 className="relative text-[1.875rem]/[2.375rem] font-semibold tracking-[-0.01875rem] text-white md:text-h3">{title}</h3>
      <ul className="relative flex-1 rounded-3xl p-6" style={{ backgroundColor: inner }}>
        {points.map((p) => (
          <li key={p} className="flex items-start gap-5 py-2 text-base font-medium text-white md:text-h6">
            <img loading="lazy" src="/icons/sparkle-sm.svg" alt="" className="mt-[0.1875rem] size-6 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StudyMbbsPage() {
  return (
    <>
      <PageHero
        background="#0b3f6b"
        textTop={302}
        backdrop={<img loading="lazy" src="/mbbs/hero.webp" alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />}
        title="World-class education. Rich heritage. Limitless opportunities"
        cta={{ label: "Book Your Seat Now", href: "/#contact" }}
      />

      <IntroPoints
        small
        title="Build Your Future in Medicine"
        points={[
          { label: "Meaningful Career", layers: ICON_EDUCATION },
          { label: "Global Opportunities", layers: ICON_GLOBAL },
          { label: "Diverse Specializations", layers: ICON_JOB },
          { label: "Long-Term Career Growth", layers: ICON_GROWTH },
          { label: "Practical Learning", layers: ICON_INNOVATION },
          { label: "Global Opportunities", layers: ICON_GLOBAL },
        ]}
      >
        <p>
          Medicine is more than a profession—it is a commitment to knowledge, compassion, and the well-being of others. Choosing the right MBBS program is
          therefore one of the most important decisions you will make.
        </p>
        <p>
          At Skolarrs, we simplify the process of finding and applying to medical universities in India and around the world. From understanding eligibility
          requirements and selecting the right university to completing applications and preparing for your journey, our experts guide you through every stage.
        </p>
        <p>
          Whether your priority is affordability, university reputation, clinical exposure, international experience, or future career opportunities, we help
          you make an informed decision.
        </p>
      </IntroPoints>

      <DestinationTabs />

      <UnlockBanner
        background="#227d9b"
        waves={["/mbbs/unlock-wave-a.svg", "/mbbs/unlock-wave-b.svg"]}
        imageFit="object-cover"
        title="Unlock a World of Opportunities"
        body="Studying abroad is more than earning a degree—it's an investment in your future. Gain access to globally recognized qualifications, advanced learning environments, and career opportunities that extend beyond borders."
        stats={[
          { value: "1500+", label: "University Tie-ups" },
          { value: "26+", label: "Years of Experience" },
          { value: "100%", label: "Visa Success Rate" },
        ]}
        image="/mbbs/unlock-student.webp"
      />

      <section className="bg-surface py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-10">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">MBBS in India vs MBBS Abroad</h2>
          <p className="text-center text-base text-[#3c3c3c] md:text-h6">
            Choosing between India and another country depends on your academic profile, budget, career goals, preferred learning environment, and long-term
            plans.
          </p>
          <div className="flex w-full flex-col gap-10 lg:flex-row">
            <CompareCard title="MBBS in India" points={INDIA_POINTS} bg="#1f845a" inner="#164b35" map="/mbbs/map-green.svg" />
            <CompareCard title="MBBS in Abroad" points={ABROAD_POINTS} bg="#227d9b" inner="#164555" map="/mbbs/map-teal.svg" />
          </div>
        </div>
      </section>

      <Testimonials />
      <Events />
      <Faq />
      <PromoBanner src="/abroad/promo.webp" alt="Study Abroad — Explore. Learn. Build your future." />
    </>
  );
}
