import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";
import SectionHeading from "@/components/SectionHeading";

const CARDS = [
  {
    title: "I’m a Parent",
    blurb: "Making the right decision for your child starts with the right information.",
    bg: "#163e78",
    inner: "#16213e",
    map: "/home/journey/map-blue.svg",
    icon: "/home/journey/icon-parent.webp",
    photo: <img loading="lazy" src="/home/journey/parent-photo.webp" alt="" className="absolute top-[3.6875rem] left-7 hidden h-[14.625rem] w-[21.9375rem] object-cover sm:block" />,
    cta: "Explore as a Parent",
    items: [
      "High Values Scholarship and Study Loans",
      "Explore India & international education opportunities",
      "Understand fees, scholarships & financial planning",
      "Compare universities & institutions",
      "Get guidance on admissions & documentation",
      "Understand safety, accommodation & student support",
      "Get complete guidance for studying abroad",
    ],
  },
  {
    title: "I’m a Student",
    blurb: "Your goals. Your choices. Your future. Let’s find the right path.",
    bg: "#943d73",
    inner: "#50253f",
    map: "/home/journey/map-magenta.svg",
    icon: "/home/journey/icon-student.webp",
    photo: (
      <div className="absolute top-4 left-10 hidden h-[14.8125rem] w-[17.4375rem] overflow-hidden sm:block">
        <img loading="lazy" src="/home/journey/student-photo.webp" alt="" className="absolute top-[2.29%] left-0 h-[117.56%] w-full max-w-none" />
      </div>
    ),
    cta: "Explore as a Student",
    items: [
      "Discover courses based on interests & strengths",
      "Find colleges & universities that match your profile",
      "Explore study opportunities in India & abroad",
      "Understand eligibility, entrance exams & cut-offs",
      "Explore affordable education options",
      "Get application & admission guidance",
      "Plan your next step with career-focused guidance",
    ],
  },
];

export default function Journey() {
  return (
    <section className="container-x flex flex-col gap-12 py-16 md:py-20">
      <SectionHeading
        title="Where are You in Your Education Journey?"
        description={
          <>
            Whether you are planning your child’s future or building your own — start with
            <br className="hidden md:block" /> the guidance that’s right for you.
          </>
        }
      />
      <div className="grid gap-12 lg:grid-cols-2">
        {CARDS.map((c) => (
          <div key={c.title} className="relative flex flex-col items-end gap-5 overflow-hidden rounded-[2rem] p-5 md:p-7" style={{ backgroundColor: c.bg }}>
            <img loading="lazy" src={c.map} alt="" className="pointer-events-none absolute top-[-3.125rem] left-24 h-[32.9375rem] w-[63.0625rem] max-w-none" />
            {c.photo}
            <div className="relative flex w-full flex-col gap-3 sm:w-[19.1875rem]">
              <div className="flex w-fit items-center rounded-full p-5" style={{ backgroundColor: c.inner }}>
                <img loading="lazy" src={c.icon} alt="" className="size-[2.625rem] object-cover" />
              </div>
              <div className="flex flex-col gap-3 text-white">
                <h3 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] md:text-h4">{c.title}</h3>
                <p className="text-label">{c.blurb}</p>
              </div>
            </div>
            <ul className="relative w-full rounded-3xl p-6 text-base font-medium text-white md:text-h6" style={{ backgroundColor: c.inner }}>
              {c.items.map((i) => (
                <CheckItem key={i} size="sm">
                  {i}
                </CheckItem>
              ))}
            </ul>
            <Button href={c.title.includes("Parent") ? "/study-abroad" : "/study-india"} variant="secondary" className="relative w-full">
              {c.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
