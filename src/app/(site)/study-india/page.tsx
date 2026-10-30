import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import PageHero from "@/components/PageHero";
import PhotoSteps from "@/components/PhotoSteps";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import UnlockBanner from "@/components/UnlockBanner";
import VectorIcon from "@/components/VectorIcon";
import Events from "@/components/home/Events";

export const metadata: Metadata = { title: "Study in India" };

const WHY = [
  {
    title: "Quality Education",
    body: "Learn from reputed universities and institutions with experienced faculty, modern infrastructure, and industry-focused programs.",
    bg: "#0055cc",
    badge: "#09326c",
    icon: "/india/icon-country.svg",
    crop: "inset-0 size-full object-cover",
  },
  {
    title: "Affordable Costs",
    body: "Access quality education with comparatively affordable tuition and living expenses.",
    bg: "#22a06b",
    badge: "#164b35",
    icon: "/india/icon-cash.svg",
    crop: "top-[0.16%] left-0 h-[131.59%] w-full",
  },
  {
    title: "Vibrant Culture",
    body: "Experience India's diverse traditions, languages, festivals, food, and communities.",
    bg: "#6e5dc6",
    badge: "#352c63",
    icon: "/india/icon-colors.svg",
    crop: "inset-0 size-full object-cover",
  },
  {
    title: "Career Opportunities",
    body: "Build skills and industry connections in one of the world's fastest-growing economies.",
    bg: "#da62ac",
    badge: "#50253f",
    icon: "/india/icon-job.svg",
    crop: "inset-0 size-full object-cover",
  },
];

const C = "/india/courses";
const COURSES: { title: string; body: string; bg: string; icon: string; art?: [string, string][] }[] = [
  { title: "Engineering & Technology", body: "B.Tech | M.Tech | Mechanical | Civil | Electrical | Electronics | AI & Robotics", bg: "#e2483d", icon: `${C}/icon-engineering.svg`, art: [[`${C}/bg-engineering.svg`, "0"]] },
  { title: "Business & Management", body: "BBA | MBA | Finance | Marketing | International Business | HR | Entrepreneurship", bg: "#16213e", icon: `${C}/icon-business.svg` },
  { title: "Medical & Healthcare", body: "MBBS | Nursing | Pharmacy | Physiotherapy | Biotechnology | Allied Health Sciences", bg: "#0a8f7c", icon: `${C}/icon-engineering.svg`, art: [[`${C}/bg-medical-a.svg`, "2.4% 0"], [`${C}/bg-medical-b.svg`, "52.4% 6.67% 37.6% 83.33%"]] },
  { title: "Computer Science & IT", body: "Computer Science | Data Science | Artificial Intelligence | Cybersecurity | Cloud Computing", bg: "#0057db", icon: `${C}/icon-cs.svg` },
  { title: "Law", body: "LLB | LLM | Corporate Law | Criminal Law | International Law", bg: "#3c2a21", icon: `${C}/icon-engineering.svg`, art: [[`${C}/bg-law.svg`, "0 1.19%"]] },
  { title: "Arts & Humanities", body: "Psychology | Economics | English | History | Political Science | Sociology", bg: "#006c7f", icon: `${C}/icon-engineering.svg`, art: [[`${C}/bg-arts.svg`, "5.06% 5.62%"]] },
  { title: "Design & Architecture", body: "Architecture | Interior Design | Fashion Design | Product Design | Graphic Design", bg: "#0e83cd", icon: `${C}/icon-architecture.svg` },
  { title: "Hospitality & Tourism", body: "Hotel Management | Tourism | Culinary Arts | Travel Management", bg: "#5e4db2", icon: `${C}/icon-engineering.svg`, art: [[`${C}/bg-tourism.svg`, "2.92% 3.12% 2.9% 3.12%"]] },
];

const STEPS = [
  { title: "Career Counselling", body: "Discuss your goals, interests, and budget with our expert counselors.", color: "#f38a3f", bar: "#e56910", image: "/india/steps/s1.webp" },
  { title: "Course & College Selection", body: "Receive personalized recommendations tailored to your profile.", color: "#845ef7", bar: "#845ef7", image: "/india/steps/s2.webp" },
  { title: "Application Submission", body: "Prepare and submit strong applications to selected universities.", color: "#42b2d7", bar: "#42b2d7", image: "/india/steps/s3.webp" },
  { title: "Entrance Exam Support", body: "Entrance Exam Support if required.", color: "#22a06b", bar: "#22a06b", image: "/india/steps/s4.webp" },
  { title: "Admission Confirmation", body: "Prepare and submit strong applications to selected colleges.", color: "#e2483d", bar: "#f15b50", image: "/india/steps/s5.webp" },
  { title: "Enrolment & Academic Planning", body: "Begin your domestic education experience with confidence.", color: "#e2b203", bar: "#e2b203", image: "/india/steps/s6.webp" },
];

export default function StudyIndiaPage() {
  return (
    <>
      <PageHero
        dark
        background="#f6c66c"
        textTop={302}
        backdrop={<img loading="lazy" src="/india/hero.webp" alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />}
        title="World-class education. Rich heritage. Limitless opportunities"
        cta={{ label: "Book Your Seat Now", href: "/#contact" }}
      />

      <section className="bg-[#fafbfd] py-16 md:py-20">
        <div className="container-x flex flex-col items-center gap-10">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">Why Study in India?</h2>
          <p className="text-center text-base text-[#3c3c3c] md:text-h6">
            India combines academic excellence, affordability, cultural diversity, and growing career opportunities to create a rewarding experience for students.
          </p>
          <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="relative flex min-h-[28rem] flex-col">
                <div className="relative h-[12.875rem] overflow-hidden rounded-t-2xl">
                  <img loading="lazy" src={`/india/why${WHY.indexOf(w) + 1}.webp`} alt="" className={`absolute max-w-none ${w.crop}`} />
                </div>
                <div className="flex flex-1 flex-col gap-10 rounded-b-2xl px-6 pt-[3.75rem] pb-6 text-white" style={{ backgroundColor: w.bg }}>
                  <h3 className="text-h5 font-semibold">{w.title}</h3>
                  <p className="text-label">{w.body}</p>
                </div>
                <span
                  className="absolute top-[10.8125rem] left-6 flex size-[4.0625rem] items-center justify-center rounded-full border border-white p-2 drop-shadow-[0px_6px_4.75px_rgba(0,0,0,0.25)]"
                  style={{ backgroundColor: w.badge }}
                >
                  <img loading="lazy" src={w.icon} alt="" className="size-[2.1875rem]" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x flex flex-col items-center gap-10 py-16 md:py-20">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-heading md:text-h3">Find the Right Course for Your Future</h2>
        <p className="text-center text-base text-[#3c3c3c] md:text-h6">
          India combines academic excellence, affordability, cultural diversity, and growing career opportunities to create a rewarding experience for students.
        </p>
        <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((c) => (
            <div key={c.title} className="relative flex min-h-[25.6875rem] flex-col items-start justify-between gap-10 overflow-hidden rounded-2xl p-6" style={{ backgroundColor: c.bg }}>
              {c.art && <VectorIcon layers={c.art} className="absolute! top-6 left-[14.0625rem] h-[13.5rem] w-[13.4375rem]" />}
              <div className="relative flex w-full flex-col gap-[4.375rem]">
                <span className="flex size-[4.0625rem] items-center justify-center rounded-full border border-white bg-white p-2 drop-shadow-[0px_6px_4.75px_rgba(0,0,0,0.25)]">
                  <img loading="lazy" src={c.icon} alt="" className="size-[2.1875rem]" />
                </span>
                <div className="flex flex-col gap-5 text-white">
                  <h3 className="text-h5 font-semibold">{c.title}</h3>
                  <p className="text-label">{c.body}</p>
                </div>
              </div>
              <Link
                href="/courses/engineering"
                className="bg-secondary-gradient relative inline-flex h-[4.5rem] w-full items-center justify-center gap-2.5 rounded-full px-10 text-h6 font-medium text-grey-500 transition hover:brightness-105"
              >
                Explore
                <img loading="lazy" src="/layout/arrow-dark.svg" alt="" className="size-6" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <UnlockBanner
        background="#1f845a"
        waves={["/india/unlock-wave-a.svg", "/india/unlock-wave-b.svg"]}
        imageFit="object-cover"
        title="Unlock a World of Opportunities"
        body="Studying abroad is more than earning a degree—it's an investment in your future. Gain access to globally recognized qualifications, advanced learning environments, and career opportunities that extend beyond borders."
        stats={[
          { value: "1500+", label: "University Tie-ups" },
          { value: "26+", label: "Years of Experience" },
          { value: "100%", label: "Visa Success Rate" },
        ]}
        image="/india/unlock-student.webp"
      />

      <PhotoSteps title="Your Study Abroad Journey" steps={STEPS} />
      <Testimonials />
      <Events />
      <Faq />
      <PromoBanner src="/abroad/promo.webp" alt="Study Abroad — Explore. Learn. Build your future." />
    </>
  );
}
