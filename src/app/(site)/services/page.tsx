import type { Metadata } from "next";
import Button from "@/components/Button";
import Linework from "@/components/Linework";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Services" };

const POINTS = [
  {
    icon: "/services/icon-university.svg",
    title: "1500+ University Tie-ups",
    body: "The choices are endless and we are there to suggest you what suits you the most.",
  },
  {
    icon: "/services/icon-support.svg",
    title: "Supporting You All the Time",
    body: "From the day you consult us till the day you land in your dream university; we will support you all the way and by all means!",
  },
  {
    icon: "/services/icon-students.svg",
    title: "Our numbers speak volumes",
    body: "The year 2020 saw 5000 of our students enrolling in their dream universities.",
  },
];

const SERVICES = [
  {
    title: "Personalized Counselling",
    desc: "Get one-on-one guidance tailored to your academic goals, interests, and future career aspirations.",
    offerings: [
      "One-on-one counselling tailored to your goals",
      "Personalized course and university recommendations",
      "Guidance based on your interests, strengths & career plans",
    ],
  },
  {
    title: "Career Guidance",
    desc: "Our counselling sessions will immensely benefit you in making the best academic decision suiting your career choices.",
    offerings: ["Career-oriented counselling", "Emphasis on futuristic courses and careers", "Interactive sessions with university delegates"],
  },
  {
    title: "Test Preparation",
    desc: "Effortlessly reach your highest potential test score with our certified, adept and dedicated tutors who will efficiently prepare you for your desired tests.",
    offerings: ["Interactive classrooms & free demo sessions", "Study material that’s simple yet highly effective", "Score oriented tutorials & mock tests"],
  },
  {
    title: "Application & Admission Support",
    desc: "Choose the right intake, apply timely and smartly in courses and universities that are your right fit and receive admits/offers in no time.",
    offerings: [
      "Flawless applications - assured admits",
      "High quality SOPs, LORs and Resumes",
      "Real time application tracking & follow through with universities",
    ],
  },
  {
    title: "University Selection & Support",
    desc: "Find the right university with expert guidance tailored to your academic profile, career goals, budget, and preferred destination.",
    offerings: [
      "Shortlisting universities based on your profile & goals",
      "Guidance on courses, rankings, fees & eligibility",
      "Complete support throughout the university application process",
    ],
  },
  {
    title: "Country & Course Selection",
    desc: "We help you choose the ideal course, university & country that perfectly match your career, academic and budget preferences.",
    offerings: [
      "Make precise academic and career decisions",
      "University comparison – rankings, courses & scholarships",
      "Course options across 1000+ universities in 42 countries",
    ],
  },
  {
    title: "Visa Processing",
    desc: "Our skilled visa experts will help you prepare and present your visa documents to Embassies and High Commissions to ensure a successful visa outcomes in minimal time.",
    offerings: ["Impeccable guidance on visa documentation", "Excellent visa success ratio across all countries", "Mock visa interviews"],
  },
  {
    title: "End to End Application Processing",
    desc: "From preparing your documents to submitting your application, we provide complete support at every stage.",
    offerings: [
      "Complete application preparation & documentation support",
      "Accurate form filling and application submission",
      "Regular updates and assistance throughout the admission process",
    ],
  },
  {
    title: "Other Services",
    desc: "We help you choose the ideal course, university & country that perfectly match your career, academic and budget preferences.",
    offerings: ["Educational loan", "Scholarships", "Internships"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        mobileImage="/services/hero-student.webp"
        background="#0b218c"
        title="Abroad and Indian Education Made Simple and Accessible"
        description="From career guidance to education financing, we make every step seamless — so your study abroad journey feels smooth and stress-free.We make every step seamless — so your study abroad journey feels smooth and stress-free."
        cta={{ label: "Apply Now", href: "/#contact" }}
        art={
          <>
            <Linework className="top-[8.5625rem] left-[1.30625rem] h-[91.0625rem] w-[117.334rem] opacity-[0.15]" />
            <img loading="lazy" src="/services/hero-student.webp" alt="" className="absolute top-[10.4375rem] left-[64.625rem] h-[39.5625rem] w-[44.125rem] object-bottom" />
          </>
        }
      />

      <section className="container-x grid gap-5 py-16 md:grid-cols-3 md:py-20">
        {POINTS.map((p) => (
          <div key={p.title} className="flex flex-col items-center gap-4 p-7 text-center">
            <img loading="lazy" src={p.icon} alt="" className="size-[3.75rem]" />
            <div className="flex flex-col gap-6">
              <h2 className="text-h5 font-semibold text-ink">{p.title}</h2>
              <p className="text-label text-[#3c3c3c]">{p.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-surface py-16 md:py-[6.25rem]">
        <div className="container-x flex flex-col items-center gap-12 md:gap-[4.5rem]">
          <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">How We Help Students?</h2>
          <div className="flex w-full max-w-[84.0625rem] flex-col gap-16 md:gap-[6.25rem]">
            {SERVICES.map((s, i) => (
              <article key={s.title} className={`flex flex-col gap-8 lg:gap-[4.5rem] ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                <div className="relative min-h-[16.25rem] flex-1 overflow-hidden rounded-[2rem] md:min-h-[22.5rem] md:rounded-[3rem]">
                  <img loading="lazy" src={`/services/rows/${i + 1}.webp`} alt="" className="absolute inset-0 size-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col items-start gap-5 p-4">
                  <div className="flex flex-col gap-5">
                    <h3 className="text-h5 font-semibold text-ink">{s.title}</h3>
                    <p className="text-base text-[#3c3c3c] md:text-h6">{s.desc}</p>
                  </div>
                  <span className="h-px w-full bg-[#d9d9d9]" />
                  <div className="flex flex-col gap-5">
                    <p className="text-h6 font-semibold text-ink">Offerings</p>
                    <ul className="flex flex-col gap-2">
                      {s.offerings.map((o) => (
                        <li key={o} className="flex items-center gap-3 text-base text-[#3c3c3c] md:text-h6">
                          <img loading="lazy" src="/icons/pointer-click.svg" alt="" className="size-6 shrink-0 -scale-y-100 rotate-180" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button href="/#contact">Enquire Now</Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
