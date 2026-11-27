import Button from "./Button";

export type Stat = { value: string; label: string };

/** Blue banner with stats and a student cut-out (Figma "Frame 576"). */
export default function UnlockBanner({
  title,
  body,
  stats,
  image,
  cta = { label: "Free Counselling", href: "/#contact" },
  background = "linear-gradient(to top, #2c7bff, #083abc)",
  waves = ["/abroad/unlock-wave-a.svg", "/abroad/unlock-wave-b.svg"],
  imageFit = "object-bottom",
}: {
  title: string;
  body: string;
  stats: Stat[];
  image: string;
  cta?: { label: string; href: string };
  background?: string;
  waves?: [string, string];
  imageFit?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-20" style={{ background }}>
      <img loading="lazy" src={waves[0]} alt="" className="pointer-events-none absolute top-[15.6875rem] left-[65.9375rem] hidden h-[32.4375rem] w-[103.938rem] max-w-none -scale-y-100 rotate-180 lg:block" />
      <img loading="lazy" src={waves[1]} alt="" className="pointer-events-none absolute top-[-15.25rem] left-[-78.625rem] hidden h-[32.4375rem] w-[103.938rem] max-w-none -scale-y-100 lg:block" />
      <div className="container-x relative flex flex-col items-center gap-12 lg:flex-row lg:items-end">
        <div className="flex flex-1 flex-col items-start gap-12 lg:pb-20">
          <div className="flex flex-col gap-12">
            <h2 className="max-w-[21.1875rem] text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-white md:text-h3">{title}</h2>
            <p className="text-label text-[#e8e8e8]">{body}</p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto md:flex-wrap md:items-center md:gap-12">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center justify-center gap-8 md:gap-12">
                {i > 0 && <span className="hidden h-14 w-px bg-white/40 md:block" />}
                <div className="flex flex-col items-center text-center">
                  <p className="bg-secondary-gradient bg-clip-text text-[1.625rem]/[2rem] font-bold md:text-[2rem]/[2.375rem] tracking-[-0.0125rem] text-transparent">{s.value}</p>
                  <p className="text-sm text-white md:text-h6">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </div>
        <img loading="lazy" src={image} alt="" className={`h-auto w-full max-w-[37.5rem] shrink-0 lg:h-[37.125rem] lg:w-[37.5rem] ${imageFit}`} />
      </div>
    </section>
  );
}
