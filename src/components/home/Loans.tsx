import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";
import SectionHeading from "@/components/SectionHeading";
import EmiCalculator from "./EmiCalculator";

const POINTS = [
  "Study Loans through 20+ leading banks",
  "Financial structuring to suit your university",
  "Hassle free documentation",
  "Pre-visa disbursal of loans",
  "Forex and Travel Insurance",
];

export default function Loans() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{ backgroundImage: "linear-gradient(-54.42deg, rgb(92,169,255) 14.86%, rgb(8,58,188) 89.17%)" }}
    >
      <img loading="lazy" src="/home/loans/blob-a.svg" alt="" className="pointer-events-none absolute top-[30.25rem] left-[38.3125rem] hidden h-[52.3125rem] w-[111.812rem] max-w-none lg:block" />
      <img loading="lazy" src="/home/loans/blob-b.svg" alt="" className="pointer-events-none absolute top-[22.8125rem] left-[50.5rem] hidden h-[53.3125rem] w-[170.5rem] max-w-none -scale-y-100 rotate-180 lg:block" />

      <div className="container-x relative flex flex-col gap-8">
        <SectionHeading
          light
          className="gap-[1.375rem]!"
          title="Reach New Heights with Education Loans"
          description="Availing an education loan to study in your dream university has never been easier!"
        />
        <img loading="lazy" src="/home/loans/divider-light.svg" alt="" className="h-px w-full" />
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-10 lg:pt-[6.25rem]">
            <ul className="flex flex-col text-lg font-semibold text-white md:text-h5">
              {POINTS.map((p) => (
                <CheckItem key={p} className="gap-5! py-5 md:py-7">
                  {p}
                </CheckItem>
              ))}
            </ul>
            <div>
              <Button href="/services" variant="secondary">
                More Details
              </Button>
            </div>
          </div>
          <EmiCalculator />
        </div>
      </div>
    </section>
  );
}
