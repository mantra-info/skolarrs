const BEFORE = [
  { icon: "/home/compare/icon-confused.webp", label: "Confused" },
  { icon: "/home/compare/icon-courses.webp", label: "Too many courses" },
  { icon: "/home/compare/icon-colleges.webp", label: "Too many colleges" },
  { icon: "/home/compare/icon-fees.webp", label: "Don’t know fess" },
  { icon: "/home/compare/icon-eligibility.webp", label: "Don’t know eligibility" },
  { icon: "/home/compare/icon-website.webp", label: "Don’t know where to apply" },
];

const AFTER: { label: string; icon: React.ReactNode; green?: boolean }[] = [
  {
    label: "Career clarity",
    icon: (
      <span className="relative size-[3.25rem] shrink-0 overflow-hidden">
        <img loading="lazy" src="/home/compare/edu-a.svg" alt="" className="absolute inset-[20.7%_17.82%_23.63%_5.86%]" />
        <img loading="lazy" src="/home/compare/edu-b.svg" alt="" className="absolute inset-[6.06%_0]" />
      </span>
    ),
  },
  { label: "Course Selection", icon: <img loading="lazy" src="/home/compare/icon-courses-c.webp" alt="" className="size-[3.25rem] object-cover" /> },
  { label: "College shortlist", icon: <img loading="lazy" src="/home/compare/icon-colleges-c.webp" alt="" className="size-[3.25rem] object-cover" /> },
  { label: "Application", icon: <img loading="lazy" src="/home/compare/icon-application.webp" alt="" className="size-[3.25rem]" /> },
  {
    label: "Visa/documentation",
    icon: (
      <span className="relative size-[3.25rem] shrink-0 overflow-hidden">
        <img loading="lazy" src="/home/compare/living-a.svg" alt="" className="absolute inset-[2.91%_8.98%_0_8.98%]" />
        <img loading="lazy" src="/home/compare/living-b.svg" alt="" className="absolute inset-[0_3.12%_5.86%_3.12%]" />
      </span>
    ),
  },
  {
    label: "New begining",
    green: true,
    icon: (
      <span className="relative size-[3.25rem] shrink-0 overflow-hidden">
        <img loading="lazy" src="/home/compare/resident-a.svg" alt="" className="absolute inset-[3.13%_0_3.13%_5.86%]" />
        <img loading="lazy" src="/home/compare/resident-b.svg" alt="" className="absolute inset-[14.84%_6.05%_3.13%_0]" />
      </span>
    ),
  },
];

export default function JourneyCompare() {
  return (
    <section className="relative overflow-hidden bg-[#f1f1f1] pt-16 md:pt-20 lg:h-[72.5rem]">
      {/* Decorative skylines, planes and students (positions are % of the 1920x1160 Figma frame) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-[33.28%_-56.53%_-58.88%_58.75%]">
          <img loading="lazy" src="/home/compare/skyline-right.svg" alt="" className="absolute inset-0 size-full" />
        </div>
        <div className="absolute inset-[33.28%_59.1%_-58.88%_-56.88%] -scale-x-100">
          <img loading="lazy" src="/home/compare/skyline-left.svg" alt="" className="absolute inset-0 size-full" />
        </div>
        <div className="absolute flex inset-[-11.81%_82.16%_41.72%_-24.11%] items-center justify-center" style={{ containerType: "size" }}>
          <img loading="lazy" src="/home/compare/plane-left.svg" alt="" className="h-[hypot(-42.4964cqw,39.958cqh)] w-[hypot(57.5036cqw,60.042cqh)] max-w-none flex-none rotate-[46.5deg]" />
        </div>
        <div className="absolute flex inset-[-11.64%_-18.07%_51.17%_81.87%] items-center justify-center" style={{ containerType: "size" }}>
          <img loading="lazy" src="/home/compare/plane-right.svg" alt="" className="h-[hypot(42.4964cqw,-39.958cqh)] w-[hypot(-57.5036cqw,-60.042cqh)] max-w-none flex-none rotate-[-133.5deg]" />
        </div>
        <img loading="lazy" src="/home/compare/girl-happy.webp" alt="" className="absolute top-[37.5625rem] left-[71.67%] h-[34.75rem] w-[29.5625rem] object-bottom" />
        <img loading="lazy" src="/home/compare/girl-confused.webp" alt="" className="absolute top-[37.75rem] left-[7.5%] h-[34.75rem] w-[29.5625rem] object-bottom" />
      </div>

      <div className="container-x relative flex flex-col items-center gap-6 pb-16 md:flex-row md:items-start md:justify-center lg:pb-0">
        <div className="flex w-full max-w-[26.6875rem] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-[2rem] bg-[#8c9bab] px-5 py-1 text-lg font-medium text-white md:text-h5">Before Skolarrs</span>
            <h3 className="w-[23.5625rem] max-w-full text-[2rem]/10 font-semibold tracking-[-0.01875rem] text-heading md:text-h3">A Confusing Journey</h3>
            <p className="text-h6 font-medium text-paragraph">Too many questions, No directions</p>
          </div>
          <ul className="flex w-full flex-col gap-2">
            {BEFORE.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-5 rounded-3xl border-[0.5px] border-[#cecece] bg-white px-6 py-3 text-h6 font-medium text-[#3c3c3c] drop-shadow-[0px_4px_7.5px_rgba(0,0,0,0.05)]"
              >
                <img loading="lazy" src={b.icon} alt="" className="size-[3.25rem] object-cover" />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full max-w-[26.6875rem] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="bg-secondary-gradient rounded-[2rem] px-5 py-1 text-lg font-medium text-ink md:text-h5">With Skolarrs</span>
            <h3 className="w-[23.5625rem] max-w-full text-[2rem]/10 font-semibold tracking-[-0.01875rem] text-[#083a8c] md:text-h3">
              A Smarter
              <br />
              Journey
            </h3>
            <p className="text-h6 font-medium text-paragraph">Expert guidance, every step of the way</p>
          </div>
          <ul className="flex w-full flex-col gap-2">
            {AFTER.map((a) => (
              <li
                key={a.label}
                className={`flex items-center gap-5 rounded-3xl border-[0.5px] px-6 py-3 text-h6 font-medium text-white ${
                  a.green ? "border-[#164b35] bg-[#22a06b]" : "bg-primary-gradient border-[#083a8c]"
                }`}
              >
                {a.icon}
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
