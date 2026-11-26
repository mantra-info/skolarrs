import Button from "./Button";

const POINTS = [
  "Expert Education Counsellers",
  "Personalized University & Course Selection",
  "SOP, LOR & Documentation Assistance",
  "Direct Admission Support to Top Institutions",
  "Career-Focused Guidance",
  "Visa Filing & Application Support",
  "Comprehensive Pre-Departure Assistance",
  "Dedicated Student Success Team",
  "Global Education Opportunities",
  "High Admission & Visa Success Support",
];

/** "Why Skolarrs Solutions?" checklist with student cut-out (Figma "Frame 440"). */
export default function WhySkolarrs({
  body = "At Skolarrs Solutions, we believe every student's dream deserves expert guidance andpersonalized support. Our dedicated team provides end-to-end assistance throughout your study abroad journey, ensuring a smooth, transparent, and stress-free experience.",
  points = POINTS,
}: {
  body?: string;
  points?: string[];
}) {
  const half = Math.ceil(points.length / 2);
  return (
    <section className="relative overflow-hidden bg-[#e9f2ff] py-16 md:py-20">
      <img loading="lazy" src="/why-skolarrs/map.svg" alt="" className="pointer-events-none absolute top-[16.5rem] left-[28.3125rem] hidden h-[38.6944rem] w-[74.1343rem] max-w-none lg:block" />
      <div className="container-x relative flex flex-col gap-[3.3125rem]">
        <div className="flex max-w-[62.5rem] flex-col gap-[1.4375rem]">
          <div className="flex flex-col gap-[3.3125rem] pb-10">
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Why Skolarrs Solutions?</h2>
            <p className="max-w-[55rem] text-base text-ink md:text-h6">{body}</p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:gap-[3.75rem]">
            {[points.slice(0, half), points.slice(half)].map((col, i) => (
              <ul key={i} className="flex flex-col gap-6">
                {col.map((p) => (
                  <li key={p} className="flex items-center gap-5 text-base font-semibold text-ink md:text-h6">
                    <img loading="lazy" src="/why-skolarrs/icon-field.svg" alt="" className="size-[1.875rem] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div>
          <Button href="/#contact" variant="secondary">
            Talk to Expert
          </Button>
        </div>
      </div>
      <div className="relative mx-auto mt-10 h-[28.75rem] w-[25rem] max-w-full overflow-hidden lg:absolute lg:top-[6.5rem] lg:left-[calc(50%+15.5rem)] lg:mt-0 lg:h-[42.5625rem] lg:w-[36.75rem]">
        <img loading="lazy" src="/why-skolarrs/student.webp" alt="" className="absolute top-0 left-[-39.27%] h-full w-[173.76%] max-w-none" />
      </div>
    </section>
  );
}
