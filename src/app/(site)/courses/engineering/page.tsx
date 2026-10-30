import type { Metadata } from "next";
import Button from "@/components/Button";
import CenteredHero from "@/components/CenteredHero";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import UniversityList from "@/components/UniversityList";
import WhySkolarrs from "@/components/WhySkolarrs";

export const metadata: Metadata = { title: "Engineering & Technology" };

const ABOUT = [
  { title: "High Career Demand", body: "Be part of a fast-growing industry with increasing opportunities across the globe" },
  { title: "Excellent Salary Potential", body: "Competitive compensation and  strong growth prospectus for skilled professionals" },
  { title: "Diverse Career Paths", body: "Explore multiple roles and specializations to find the paths that fits your passion and strength" },
  { title: "Innovation and Creativity", body: "Work on cutting edge technologies and bring impactful ideas to life" },
  { title: "Global Opportunities", body: "Collaborate with international clients and be part of a global network" },
  { title: "Continuous Learning & Growth", body: "Upgrade your skills, learn from industry experts, and grow up at every step of your journey" },
];

const TRENDING = [
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Cyber Security",
  "Robotics & Automation",
  "VLSI & Semiconductor Engineering",
  "EV Engineering",
  "Renewable Energy Engineering",
  "Aerospace Engineering",
  "Computer Science Engineering",
  "Electronics & Communications Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
];

const U = "/course/unis";
const UNIVERSITIES = [
  { name: "Adithya Institute of Technology, Coimbatore", logo: `${U}/adithya.webp`, h: 47, href: "/colleges/adithya-institute-of-technology" },
  { name: "Amrita College of Engineering, Coimbatore", logo: `${U}/amrita.webp`, h: 47 },
  { name: "CMS College of Engineering, Coimbatore", logo: `${U}/cms.webp`, h: 47 },
  { name: "Dhanalakshmi Srinivasan College og Engineering, Coimbatore", logo: `${U}/dhanalakshmi.webp`, h: 47 },
  { name: "Karpagam College of Engineering, Coimbatore", logo: `${U}/karpagam.webp`, h: 47 },
  { name: "Akshaya College of Engineering and Technology, Coimbatore", logo: `${U}/akshaya.webp`, h: 47 },
  { name: "Arjun College of Technology, Coimbatore", logo: `${U}/arjun.webp`, h: 47 },
  { name: "Dhaanish Ahmed Institute of Technology, Coimbatore", logo: `${U}/dhaanish.webp`, h: 47 },
  { name: "Hindusthan College of Engineering, Coimbatore", logo: `${U}/hindusthan.webp`, h: 47 },
  { name: "Kathir College of Engineering, Coimbatore", logo: `${U}/kathir.webp`, h: 47 },
];

export default function EngineeringCoursePage() {
  return (
    <>
      <CenteredHero
        slides={["/course/hero/h1.webp", "/course/hero/h2.webp", "/course/hero/h3.webp", "/course/hero/h4.webp"]}
        crumbs={[{ label: "Study India", href: "/study-india" }, { label: "Engineering & Technology" }]}
        title="Build. Innovate. Lead the Future."
      />

      <section className="container-x flex flex-col items-start gap-[2.6875rem] py-16 md:py-20">
        <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-ink md:text-h4">About Engineering &amp; Technology</h2>
        <p className="text-base text-[#3c3c3c] md:text-h6">
          Engineering &amp; Technology is a dynamic field that drives innovation, solves real-world challenges, and shapes the future of industries worldwide.
          From computer science and artificial intelligence to civil, mechanical, and electrical engineering, these programs equip students with technical
          expertise, problem-solving abilities, and practical skills needed to excel in today&apos;s rapidly evolving technological landscape. Graduates enjoy
          diverse career opportunities across sectors such as IT, manufacturing, construction, healthcare, telecommunications, and research.
        </p>
        <Button href="/#contact" variant="secondary">
          Apply Now
        </Button>
        <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ABOUT.map((a, i) => (
            <div key={a.title} className="flex flex-col gap-[2.6875rem] rounded-3xl bg-[#f7f8f9] p-4">
              <div className="relative h-[15.625rem] overflow-hidden rounded-2xl">
                <img loading="lazy" src={`/course/about/a${i + 1}.webp`} alt="" className="absolute inset-0 size-full object-cover" />
              </div>
              <h3 className="text-h5 font-semibold text-ink">{a.title}</h3>
              <p className="text-base text-[#3c3c3c] md:text-h6">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#e9f2ff] py-16 md:py-20">
        <div className="container-x flex flex-col gap-[2.6875rem]">
          <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-ink md:text-h4">Trending Engineering courses</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRENDING.map((t, i) => (
              <div key={t} className="flex flex-col gap-[2.6875rem] rounded-3xl border-[0.5px] border-[#b6c2cf] bg-white p-4">
                <div className="relative h-[15.625rem] overflow-hidden rounded-2xl">
                  <img loading="lazy" src={`/course/trending/t${i + 1}.webp`} alt="" className="absolute inset-0 size-full object-cover" />
                </div>
                <p className="max-w-[17.5625rem] text-label font-medium text-ink">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UniversityList wide title="Popular Engineering & Technology Universities in India" items={UNIVERSITIES} pageSize={10} />

      <section className="container-x py-[3.75rem]">
        <div className="relative aspect-[1559/521] w-full overflow-hidden rounded-2xl">
          <img loading="lazy" src="/course/promo.webp" alt="Engineering Study — Build your future" className="absolute inset-0 size-full object-cover" />
        </div>
      </section>

      <WhySkolarrs />
      <Testimonials />
      <Faq />
    </>
  );
}
