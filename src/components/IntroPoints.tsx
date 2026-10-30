import Button from "./Button";
import VectorIcon from "./VectorIcon";

export type Point = { label: string; layers: [string, string][] };

/** Intro copy on the left with a 3x2 grid of icon point cards on the right (Figma "Frame 715/797"). */
export default function IntroPoints({
  title,
  children,
  points,
  small,
  cta = "Apply Now",
}: {
  title: string;
  children: React.ReactNode;
  points: Point[];
  small?: boolean;
  cta?: string;
}) {
  return (
    <section className="container-x flex flex-col gap-12 py-16 md:py-[6.25rem] lg:flex-row lg:items-center lg:justify-between lg:gap-[6.25rem]">
      <div className="flex flex-1 flex-col items-start gap-[2.625rem]">
        <div className="flex flex-col gap-[2.6875rem]">
          <h2 className={small ? "text-h5 font-semibold text-ink" : "text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3"}>{title}</h2>
          <div className={`flex flex-col gap-[1.375rem] text-[#3c3c3c] ${small ? "text-label" : "text-base md:text-h6"}`}>{children}</div>
        </div>
        <Button href="/#contact" variant="secondary">
          {cta}
        </Button>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
        {points.map((p, i) => (
          <div key={i} className="flex min-h-[9.375rem] flex-col items-center justify-center gap-6 rounded-[2rem] border-[0.5px] border-[#909bd3] bg-[#fafbfd] p-6 text-center">
            <VectorIcon layers={p.layers} className="size-[3.125rem]" />
            <p className="text-label font-medium text-[#3c3c3c]">{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
