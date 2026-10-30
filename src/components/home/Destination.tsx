import Button from "@/components/Button";

export default function Destination() {
  return (
    <section className="relative overflow-hidden bg-soft-yellow">
      <div className="container-x relative flex flex-col items-center gap-12 py-16 lg:h-[45.25rem] lg:flex-row lg:justify-end lg:gap-[8.25rem] lg:py-[6.25rem]">
        {/* Collage, positioned relative to the 1560px content box (Figma offsets minus the 180px gutter) */}
        <div className="relative h-[28.75rem] w-full max-w-[43.75rem] sm:h-[37.125rem] lg:absolute lg:top-[8.125rem] lg:left-0 lg:h-[37.125rem] lg:w-[43.75rem]">
          <div className="absolute top-[4.75rem] left-[23.375rem] hidden h-[29.25rem] w-[20.375rem] overflow-hidden rounded-xl sm:block">
            <img loading="lazy" src="/home/destination/newyork.webp" alt="" className="absolute top-0 left-[-71.85%] h-full w-[215.32%] max-w-none" />
          </div>
          <img loading="lazy" src="/home/destination/london.webp" alt="" className="absolute top-0 left-0 h-[25rem] w-[18.125rem] rounded-xl object-cover sm:h-[30.5rem] sm:w-[22.125rem]" />
          <img
            loading="lazy"
            src="/home/destination/student.webp"
            alt="Student pointing to study abroad destinations"
            className="absolute top-6 left-[1.875rem] h-[27.25rem] w-[26.5625rem] object-bottom sm:left-[4.3125rem] sm:h-[35.625rem] sm:w-[34.75rem]"
          />
          <img loading="lazy" src="/flags/usa.svg" alt="" className="absolute top-[2.0625rem] left-[35.9375rem] hidden size-[5.1875rem] sm:block" />
          <img loading="lazy" src="/flags/finland.svg" alt="" className="absolute top-[27.875rem] left-[5.0625rem] size-[5.25rem]" />
        </div>

        <div className="relative flex w-full flex-col gap-12 lg:w-[43.375rem]">
          <div className="flex flex-col gap-10">
            <h2 className="max-w-[32.875rem] text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] text-heading md:text-h2">Find Your Perfect Abroad Study Destination</h2>
            <p className="text-lg text-paragraph md:text-h5 md:tracking-[-0.009375rem]">
              Choose what suits you from <strong className="font-semibold text-heading">250+ global universities</strong> in, world over.
            </p>
          </div>
          <div>
            <Button href="/study-abroad">Explore Countries</Button>
          </div>
        </div>
      </div>

      <img loading="lazy" src="/flags/uk.svg" alt="" className="absolute top-[10.1875rem] left-[-4.25rem] hidden size-[8.5rem] lg:block" />
      <img loading="lazy" src="/flags/italy.svg" alt="" className="absolute top-[7.8125rem] right-[3.6875rem] hidden size-[7.5625rem] lg:block" />
      <img loading="lazy" src="/flags/canada.svg" alt="" className="absolute top-[37.9375rem] right-[13.4375rem] hidden size-[14.0625rem] lg:block" />
    </section>
  );
}
