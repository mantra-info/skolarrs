import Link from "next/link";
import Button from "@/components/Button";

export const TRENDING_COURSES = [
  {
    title: "Engineering & Technology",
    desc: "Computer Science, AI & Data Science, Civil Engineering",
    bg: "#0057db",
    photoBg: "linear-gradient(to bottom, #a0afd0, #687b9d)",
    photo: "/home/courses/engineering.webp",
    icon: "/home/courses/icon-engineering.svg",
    href: "/courses/engineering",
  },
  {
    title: "Allied Health Science",
    desc: "Nursing, Pharmacy, BDS, Nutrition & Dietetics, Physician Assistant",
    bg: "#006c7f",
    photoBg: "linear-gradient(to bottom, #59dde8, #0d939f)",
    photo: "/home/courses/allied.webp",
    icon: "/home/courses/icon-health.svg",
    href: "/study-india",
  },
  {
    title: "MBBS",
    desc: "General Medicine, Pediatrics, Cardiology, Radiology, Surgery",
    bg: "#0a8f7c",
    photoBg: "#f1c3ac",
    photo: "/home/courses/mbbs.webp",
    icon: "/home/courses/icon-mbbs.svg",
    href: "/study-mbbs",
  },
  {
    title: "LLB",
    desc: "LLB, BA LLB, Public Administration",
    bg: "#3c2a21",
    photoBg: "transparent",
    photo: "/home/courses/llb.webp",
    icon: "/home/courses/icon-law.svg",
    href: "/study-india",
  },
  {
    title: "Nursing",
    desc: "B.Sc. Nursing, General Nursing, M.Sc. Nursing, Pediatric Nursing",
    bg: "#26a69a",
    photoBg: "#f1c3ac",
    photo: "/home/courses/nursing.webp",
    icon: "/home/courses/icon-nursing.svg",
    href: "/study-india",
  },
];

export default function TrendingCourses({ title = "Explore Trending Domestic Courses" }: { title?: string }) {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-x flex flex-col items-center gap-12">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">{title}</h2>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TRENDING_COURSES.map((c) => (
            <Link key={c.title} href={c.href} className="group flex flex-col overflow-hidden rounded-xl transition hover:-translate-y-1 lg:h-[28.4375rem]" style={{ backgroundColor: c.bg }}>
              <div className="relative h-[17.0625rem] shrink-0 overflow-hidden" style={{ background: c.photoBg }}>
                <img loading="lazy" src={c.photo} alt="" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-5">
                <div className="flex flex-col gap-3">
                  <img loading="lazy" src={c.icon} alt="" className="size-9" />
                  <p className="text-h6 font-semibold text-white">{c.title}</p>
                </div>
                <p className="text-sm leading-5 tracking-[-0.01rem] text-white">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button href="/courses/engineering" variant="secondary">
          View More Courses
        </Button>
      </div>
    </section>
  );
}
