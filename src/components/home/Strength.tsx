import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";

const STATS = [
  { value: "1000+", label: "Top Colleges", bg: "#006c7f", icon: "/home/strength/icon-colleges.svg" },
  { value: "250+", label: "University Tie-ups", bg: "#163e78", icon: "/home/strength/icon-tieups.svg" },
  { value: "50k+", label: "Students Guided", bg: "#684eff", icon: "/home/strength/icon-students.webp" },
  { value: "100%", label: "Success Rate", bg: "#e7a700", icon: "/home/strength/icon-success.svg" },
  { value: "26+", label: "Years of Excellence", bg: "#26a69a", icon: "/home/strength/icon-years.svg" },
  { value: "24/7", label: "Expert Support", bg: "#3c2a21", icon: "/home/strength/icon-support.svg" },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="relative flex h-[17.5rem] flex-col items-center justify-between overflow-hidden rounded-[2rem] border-[0.5px] border-paragraph p-8 md:h-[21.875rem] md:p-12"
          style={{ backgroundColor: s.bg }}
        >
          <img loading="lazy" src="/home/strength/card-texture.webp" alt="" className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.16]" />
          <img loading="lazy" src={s.icon} alt="" className="relative size-[3.75rem]" />
          <div className="relative flex flex-col items-center gap-3 text-center text-white">
            <p className="text-[2rem]/[2.5rem] font-semibold tracking-[-0.01875rem] md:text-h3">{s.value}</p>
            <p className="text-lg/6 font-medium md:text-h5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Strength() {
  return (
    <section className="container-x flex flex-col gap-10 py-16 md:py-[6.25rem]">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-8 md:gap-[3.75rem]">
            <h2 className="text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] text-ink md:text-h2">Our Strength</h2>
            <p className="text-base text-grey-500 md:text-h6">
              <strong className="font-semibold">Skolarrs Solutions Pvt. Ltd.</strong> is a leading higher education guidance and admissions consultancy dedicated
              to helping students make informed academic and career decisions through transparent, personalized, and end-to-end counselling services. With over{" "}
              <strong className="font-semibold">26+ years of excellence,</strong> Skolarrs supports admissions across{" "}
              <strong className="font-semibold">Engineering, Medical, Allied Health Sciences, Nursing, Arts &amp; Science, Management, and Study Abroad</strong>{" "}
              programs, partnering with <strong className="font-semibold">250+ universities, 1,000+ colleges, and institutions in 45+ countries</strong>. The
              organization provides expert guidance for counselling processes such as{" "}
              <strong className="font-semibold">TNEA, MCC, and state-level admissions,</strong> while also assisting students aspiring to pursue education overseas.
              Through a strong focus on integrity, student success, and digital innovation, Skolarrs combines accurate information, expert counselling,
              comprehensive admission support, and educational resources to simplify the journey from career aspiration to successful admission, positioning
              itself as a trusted partner for students and parents seeking quality higher education opportunities in India and abroad.
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-8 text-h6 font-medium text-grey-500 sm:grid-cols-2">
            <CheckItem>Expert Career Guidance</CheckItem>
            <CheckItem>Trusted University Network</CheckItem>
            <CheckItem>Abroad &amp; Domestic Admissions</CheckItem>
            <CheckItem>End-to-End Student Support</CheckItem>
          </ul>
          <div>
            <Button href="/about">Read More</Button>
          </div>
        </div>
        <div className="relative min-h-[22.5rem] flex-1 overflow-hidden rounded-2xl">
          <img loading="lazy" src="/home/strength/photo.webp" alt="Students studying together on campus steps" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
      <img loading="lazy" src="/icons/divider.svg" alt="" className="h-px w-full rotate-180" />
      <StatCards />
    </section>
  );
}
