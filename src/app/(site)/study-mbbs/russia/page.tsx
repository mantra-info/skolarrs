import type { Metadata } from "next";
import CenteredHero from "@/components/CenteredHero";
import IntroPoints from "@/components/IntroPoints";
import PromoBanner from "@/components/PromoBanner";
import UniversityList from "@/components/UniversityList";
import WhyAccordion from "@/components/WhyAccordion";
import { ICON_EDUCATION, ICON_GLOBAL, ICON_GROWTH, ICON_INNOVATION, ICON_JOB } from "@/data/icons";

export const metadata: Metadata = { title: "MBBS in Russia" };

const R = "/russia";
const BODY = "Understand the best course, university, and career pathway based on your academic profile, interests, and future goals.";

export default function RussiaPage() {
  return (
    <>
      <CenteredHero image={`${R}/hero.webp`} crumbs={[{ label: "Abroad", href: "/study-mbbs" }, { label: "Russia" }]} title="MBBS in Russia" />

      <IntroPoints
        small
        title="About MBBS In Russia"
        points={[
          { label: "Affordable Tuition Fees", layers: ICON_EDUCATION },
          { label: "Globally Recognized Medical Degrees", layers: ICON_GLOBAL },
          { label: "Advanced Medical Infrastructure", layers: ICON_JOB },
          { label: "Strong Clinical Exposure", layers: ICON_GROWTH },
          { label: "Practical Learning", layers: ICON_INNOVATION },
          { label: "Global Opportunities", layers: ICON_GLOBAL },
        ]}
      >
        <p>
          Russia is one of the most preferred destinations for Indian medical aspirants due toits affordable tuition fees, globally recognized universities, modern
          infrastructure, and extensive clinical exposure. Russian medical universities are recognized by WHO, NMC, ECFMG, and other international medical bodies.
        </p>
      </IntroPoints>

      <UniversityList
        title="Popular Universities in Russia"
        items={[
          { name: "Kazan Federal University", logo: `${R}/u-kazan.webp`, h: 47 },
          { name: "Orenburg State Medical University", logo: `${R}/u-orenburg.webp`, h: 47, crop: "inset-0 size-full object-cover" },
          { name: "Crimea Federal University", logo: `${R}/u-crimea.webp`, h: 37, crop: "top-0 left-[30.63%] h-full w-[38.74%]" },
          { name: "Bashkir State Medical University", logo: `${R}/u-bashkir.webp`, h: 63 },
          { name: "Ural State Medical University", logo: `${R}/u-ural.webp`, h: 33, crop: "top-[-15.91%] left-[31.76%] h-[131.82%] w-[36.25%]" },
          { name: "Tver State Medical University", logo: `${R}/u-tver.webp`, h: 48, crop: "inset-0 size-full object-cover" },
        ]}
      />

      <WhyAccordion
        image={`${R}/why.webp`}
        items={[
          "Personalized MBBS Counselling",
          "Country & University Selection",
          "Application Processing Support",
          "Documentation & Visa Assistance",
          "Pre-Departure Guidance",
          "End-to-End MBBS Admission Support",
        ].map((title) => ({ title, body: BODY }))}
      />

      <PromoBanner src={`${R}/promo.webp`} alt="MBBS Abroad — Your dream. A healthier world." crop="top-[-6.15%] h-[112.5%]" />
    </>
  );
}
