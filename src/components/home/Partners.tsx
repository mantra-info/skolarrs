import { sanityFetch } from "@/sanity/lib/fetch";
import { img } from "@/sanity/lib/image";
import { PARTNERS, type HomeDoc, type PartnerDoc } from "@/sanity/lib/queries";

function Marquee({ logos, gap, height, reverse }: { logos: PartnerDoc[]; gap: number; height: number; reverse?: boolean }) {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = [...logos, ...logos];
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="animate-marquee flex w-max items-center" style={{ gap: `${gap / 16}rem`, animationDirection: reverse ? "reverse" : undefined }}>
        {row.map((l, i) => (
          <img
            key={i}
            loading="lazy"
            src={img(l.logo, 400)}
            alt={i < logos.length ? l.name : ""}
            aria-hidden={i >= logos.length}
            className="w-auto max-w-[11rem] shrink-0 object-contain"
            style={{ height: `${height / 16}rem` }}
          />
        ))}
      </div>
    </div>
  );
}

export default async function Partners({ home }: { home: HomeDoc }) {
  const partners = await sanityFetch<PartnerDoc[]>({ query: PARTNERS, tags: ["partner"] });
  const abroad = partners.filter((p) => p.group === "abroad");
  const india = partners.filter((p) => p.group === "india");

  return (
    <section className="bg-white py-12 md:py-[3.75rem]">
      <div className="flex flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-[3.75rem] lg:pl-[max(1rem,calc((100vw-97.5rem)/2))] lg:pr-0">
        <div className="shrink-0 lg:w-[23.8125rem]">
          <p className="text-h2 font-semibold text-heading">{home.partnersCount}</p>
          <p className="text-[1.625rem]/[2.375rem] font-bold tracking-[-0.0125rem] text-heading md:text-h4">{home.partnersTitle}</p>
          <p className="text-[1.625rem]/[2.375rem] font-semibold tracking-[-0.0125rem] text-paragraph md:text-h4">{home.partnersSubtitle}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-10 md:gap-[3.75rem]">
          {abroad.length > 0 && <Marquee logos={abroad} gap={37} height={50} />}
          {india.length > 0 && <Marquee logos={india} gap={45} height={72} reverse />}
        </div>
      </div>
    </section>
  );
}
