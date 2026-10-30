import type { Metadata } from "next";
import Button from "@/components/Button";
import CenteredHero from "@/components/CenteredHero";
import CourseTabs from "@/components/college/CourseTabs";

export const metadata: Metadata = { title: "Adithya Institute of Technology, Coimbatore" };

const C = "/college";

const PILLARS = [
  { title: "Vision", body: "To be a center of excellence in technical education and research.", icon: `${C}/icon-vision.svg`, w: 51, h: 63 },
  { title: "Mission", body: "To empower students with knowledge, skills and values for a better tomorrow.", icon: `${C}/icon-mission.svg`, w: 52, h: 64 },
  { title: "Our Values", body: "Integrity, Innovation, Excellence and Social Responsibility.", icon: `${C}/icon-values.svg`, w: 50, h: 61 },
];

const STATS = [
  { value: "100%", label: "Successful Students" },
  { value: "32+", label: "Awards & Recognitions" },
  { value: "150+", label: "Faculty Members" },
  { value: "1000+", label: "Students Enrolled" },
  { value: "50+", label: "Industry Collaborations" },
];

const FEATURES = [
  { title: "Strong Technical Foundation", body: "Develop a solid understanding of engineering principles, technology, mathematics, and scientific concepts.", icon: "technical" },
  { title: "Practical Learning", body: "Gain hands-on experience through laboratories, projects, workshops, internships, and industry exposure.", icon: "learning" },
  { title: "Innovation & Research", body: "Explore emerging technologies and work on solutions that address real-world problems.", icon: "research" },
  { title: "Industry Exposure", body: "Connect classroom learning with practical applications through internships, projects, industry interactions, and technical events.", icon: "industry" },
  { title: "Global Career Opportunities", body: "Build transferable technical and analytical skills that can open opportunities across industries and markets.", icon: "career" },
  { title: "Diverse Specializations", body: "Choose from traditional engineering disciplines as well as emerging fields such as AI, robotics, data science, and renewable energy.", icon: "specialization" },
];

const UG = [
  {
    title: "B.Tech Artificial Intelligence & Data Science",
    body: "B.Tech in Artificial Intelligence and Data Science (AIDS) is a four-year undergraduate program that focuses on developing AI-based solutions and analyzing large datasets for decision-making.",
  },
  {
    title: "B.Tech Information Technology",
    body: "B.Tech in Information Technology (IT) is a four-year undergraduate program that focuses on the study of computing technologies, software development, networking, and cybersecurity.",
  },
  {
    title: "B.E Civil Engineering",
    body: "B.E. in Civil Engineering is a four-year undergraduate program that focuses on the design, construction, and maintenance of infrastructure projects such as buildings, roads, bridges, dams, and tunnels.",
  },
  {
    title: "B.E Computer Science and Engineering",
    body: "B.E. in Computer Science and Engineering (CSE) is a four-year undergraduate program that focuses on the study of computing technologies, software development, algorithms, and data structures.",
  },
  {
    title: "B.E Electronics and Communication Engineering",
    body: "B.E. in Electronics and Communication Engineering (ECE) is a four-year undergraduate program that focuses on the design, development, and maintenance of electronic devices and communication systems.",
  },
];

// PG content is not specified in the design; representative programmes.
const PG = [
  { title: "M.E Computer Science and Engineering", body: "A two-year postgraduate program covering advanced algorithms, distributed systems, machine learning, and research methodology." },
  { title: "M.E Structural Engineering", body: "A two-year postgraduate program focused on the analysis and design of safe, efficient, and sustainable structures." },
  { title: "M.E VLSI Design", body: "A two-year postgraduate program in digital and analog IC design, verification, and semiconductor technology." },
  { title: "MBA", body: "A two-year postgraduate program building management, leadership, and business analytics skills for engineers and graduates." },
];

const REVIEWS = [
  { rating: "5.0", initial: "M", name: "Merina", course: "Computer Science", quote: "The Computer Science program has been incredibly rewarding. From building real-world projects to learning from supportive professors, I’ve gained the skills and confidence to pursue a career in technology." },
  { rating: "5.0", initial: "F", name: "Rajani", course: "Software Engineering", quote: "The Software Engineering curriculum pushed me to design scalable systems and embrace agile methodologies, equipping me with practical experience for the tech industry." },
  { rating: "4.9", initial: "M", name: "Derek", course: "Electrical Engineering", quote: "Studying Electrical Engineering allowed me to dive deep into hardware-software integration, preparing me to develop innovative embedded systems." },
  { rating: "5.0", initial: "F", name: "Lina", course: "Mechanical Engineering", quote: "The Mechanical Engineering courses emphasized problem-solving and design thinking, which helped me excel in product development roles." },
  { rating: "4.8", initial: "M", name: "Carlos", course: "Civil Engineering", quote: "Through Civil Engineering, I learned how to apply engineering principles to real-world infrastructure challenges, making a tangible impact on communities." },
];

export default function AdithyaPage() {
  return (
    <>
      <CenteredHero
        image={`${C}/hero.webp`}
        crumbs={[
          { label: "Study India", href: "/study-india" },
          { label: "Engineering & Technology", href: "/courses/engineering" },
          { label: "Adithya Institute of Technology, Coimbatore" },
        ]}
        title="Adithya Institute of Technology, Coimbatore"
      />

      <section className="container-x flex flex-col gap-10 py-16 md:py-[6.25rem]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch">
          <div className="flex flex-col items-start gap-[2.625rem] lg:w-[49.25rem] lg:shrink-0">
            <div className="flex flex-col gap-[2.6875rem]">
              <h2 className="text-h5 font-semibold text-ink">About Adithya</h2>
              <div className="flex flex-col gap-[1.875rem] text-base text-[#3c3c3c] md:text-h6">
                <p>
                  Adithya Institute of Technology (AIT) is committed to fostering academic excellence by providing a comprehensive and industry-relevant
                  curriculum. The institution aims to cultivate a strong foundation in engineering and management disciplines through innovative teaching
                  methodologies, research-driven learning, and hands-on practical exposure. By integrating advanced technology and modern pedagogy, AIT ensures that
                  students develop critical thinking, problem-solving abilities, and technical proficiency to meet global industry standards.
                </p>
                <p>
                  Beyond academics, AIT strives to nurture a culture of innovation, entrepreneurship, and leadership among students. The institute actively
                  collaborates with industry leaders, research organizations, and academic institutions to provide students with real-world exposure and
                  experiential learning opportunities. Through workshops, seminars, and internships, AIT empowers students to develop the professional competencies
                  necessary to excel in a competitive global landscape.
                </p>
              </div>
            </div>
            <Button href="/#contact" variant="secondary">
              Apply Now
            </Button>
          </div>
          <div className="relative min-h-[20rem] flex-1 overflow-hidden rounded-xl">
            <img loading="lazy" src={`${C}/about.webp`} alt="Adithya Institute of Technology campus" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-[#e9f2ff] p-4 md:flex-row md:gap-10">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="flex flex-1 items-stretch gap-10">
              {i > 0 && <span className="hidden w-px bg-[#b6c2cf] md:block" />}
              <div className="flex flex-col gap-4 p-4">
                <img loading="lazy" src={p.icon} alt="" style={{ width: `${p.w / 16}rem`, height: `${p.h / 16}rem` }} />
                <div className="flex flex-col gap-7">
                  <h3 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-[#09326c] md:text-h4">{p.title}</h3>
                  <p className="text-base text-[#3c3c3c] md:text-h6">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:items-stretch lg:justify-between">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-stretch gap-8">
              {i > 0 && <span className="hidden w-px bg-[#d9d9d9] lg:block" />}
              <div className="flex items-start gap-5">
                <img loading="lazy" src={`${C}/icon-stat.svg`} alt="" className="size-[3.25rem] shrink-0" />
                <div>
                  <p className="text-[2rem]/10 font-bold tracking-[-0.01875rem] text-ink md:text-h3">{s.value}</p>
                  <p className="text-h6 text-[#777]">{s.label}</p>
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
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-6 rounded-[2rem] border-[0.5px] border-[#ccd2dc] bg-[rgba(247,248,249,0.09)] px-7 py-6">
                <img loading="lazy" src={`${C}/icons/${f.icon}.webp`} alt="" className="size-[3.75rem] shrink-0 md:size-20" />
                <div className="flex flex-col gap-6">
                  <h3 className="text-h5 font-semibold text-white">{f.title}</h3>
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
          <div className="relative min-h-[18.75rem] overflow-hidden rounded-xl">
            <img loading="lazy" src={`${C}/campus-main.webp`} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="relative min-h-[5.625rem] flex-1 overflow-hidden rounded-xl">
                <img loading="lazy" src={`${C}/campus-${n}.webp`} alt="" className="absolute inset-0 size-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseTabs title="Top Courses - Engineering & Technology" ug={UG} pg={PG} />

      <section className="overflow-hidden bg-white py-16 md:py-20">
        <div className="container-x flex flex-col gap-6">
          <div className="flex flex-col gap-6 pb-5">
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Real Stories, Real Success</h2>
            <p className="text-label text-[#3c3c3c]">
              Our expert guidance has helped students confidently secure seats at top colleges, navigate complex admissions, and achieve their dream careers —
              stress-free and on time.
            </p>
          </div>
          <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="flex w-[20rem] shrink-0 snap-start flex-col gap-7 rounded-2xl bg-[#e9f2ff] p-5 md:w-[29rem]">
                <div className="flex items-center gap-1 text-h6 font-medium text-ink">
                  <img loading="lazy" src={`${C}/star.svg`} alt="" className="size-6" />
                  {r.rating}
                </div>
                <blockquote className="text-base leading-7 text-ink md:text-lg/7">{r.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex size-[3.125rem] items-center justify-center rounded-full bg-[linear-gradient(to_top,#5ca9ff,#083abc)] text-h6 font-semibold text-white">
                    {r.initial}
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
    </>
  );
}
