import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";
import SectionHeading from "@/components/SectionHeading";

const ITEMS = [
  "Virtual Coaching and Counselling",
  "Applications, Admission & Visas",
  "Country & University Selection",
  "High Values Scholarship and Study Loans",
];

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-surface py-16 md:py-20">
      <div className="container-x relative flex flex-col gap-12">
        <SectionHeading
          title="Our Services and Offerings"
          description="From career guidance to education financing, we make every step seamless — so your study abroad journey feels smooth and stress-free.We make every step seamless — so your study abroad journey feels smooth and stress-free"
        />
        <img loading="lazy" src="/icons/divider.svg" alt="" className="h-px w-full" />

        <div className="relative flex flex-col gap-10 lg:min-h-[39.625rem] lg:flex-row lg:items-start">
          <img loading="lazy" src="/home/services/world-map.svg" alt="" className="pointer-events-none absolute top-[8.6875rem] left-[32.875rem] hidden h-[37.6875rem] w-[72.25rem] max-w-none lg:block" />
          <div className="relative flex flex-col gap-10 lg:pt-[6.25rem]">
            <ul className="flex flex-col text-lg font-semibold text-heading md:text-h5">
              {ITEMS.map((i) => (
                <CheckItem key={i} className="gap-5! py-5 md:py-7">
                  {i}
                </CheckItem>
              ))}
            </ul>
            <div>
              <Button href="/services" variant="secondary">
                View More
              </Button>
            </div>
          </div>
          <img
            loading="lazy"
            src="/home/services/student.webp"
            alt="Smiling student holding books"
            className="relative mx-auto h-auto w-[18.75rem] object-bottom md:w-[25rem] lg:absolute lg:top-[2.4375rem] lg:left-[56.25rem] lg:mx-0 lg:h-[39.625rem] lg:w-[35.9375rem]"
          />
        </div>
      </div>
    </section>
  );
}
