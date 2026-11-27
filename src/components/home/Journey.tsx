import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";
import SectionHeading from "@/components/SectionHeading";
import { img } from "@/sanity/lib/image";
import type { HomeDoc } from "@/sanity/lib/queries";

/** Fixed artwork per card position: first card is the Parent layout, second the Student layout. */
const LAYOUTS = [
  {
    map: "/home/journey/map-blue.svg",
    photo: (src: string) => <img loading="lazy" src={src} alt="" className="absolute top-[3.6875rem] left-7 hidden h-[14.625rem] w-[21.9375rem] object-cover sm:block" />,
  },
  {
    map: "/home/journey/map-magenta.svg",
    photo: (src: string) => (
      <div className="absolute top-4 left-10 hidden h-[14.8125rem] w-[17.4375rem] overflow-hidden sm:block">
        <img loading="lazy" src={src} alt="" className="absolute top-[2.29%] left-0 h-[117.56%] w-full max-w-none" />
      </div>
    ),
  },
];

export default function Journey({ home }: { home: HomeDoc }) {
  return (
    <section className="container-x flex flex-col gap-12 py-16 md:py-20">
      <SectionHeading
        title={home.journeyTitle}
        description={home.journeyBody && <span className="md:whitespace-pre-line">{home.journeyBody}</span>}
      />
      <div className="grid gap-12 lg:grid-cols-2">
        {(home.journeyCards ?? []).slice(0, 2).map((c, i) => (
          <div key={c._key} className="relative flex flex-col items-end gap-5 overflow-hidden rounded-[2rem] p-5 md:p-7" style={{ backgroundColor: c.color ?? "#163e78" }}>
            <img loading="lazy" src={LAYOUTS[i].map} alt="" className="pointer-events-none absolute top-[-3.125rem] left-24 h-[32.9375rem] w-[63.0625rem] max-w-none" />
            {c.photo && LAYOUTS[i].photo(img(c.photo, 800))}
            <div className="relative flex w-full flex-col gap-3 sm:w-[19.1875rem]">
              <div className="flex w-fit items-center rounded-full p-5" style={{ backgroundColor: c.innerColor ?? "#16213e" }}>
                {c.icon && <img loading="lazy" src={img(c.icon, 100)} alt="" className="size-[2.625rem] object-cover" />}
              </div>
              <div className="flex flex-col gap-3 text-white">
                <h3 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] md:text-h4">{c.title}</h3>
                <p className="text-label">{c.blurb}</p>
              </div>
            </div>
            <ul className="relative w-full rounded-3xl p-6 text-base font-medium text-white md:text-h6" style={{ backgroundColor: c.innerColor ?? "#16213e" }}>
              {(c.points ?? []).map((p) => (
                <CheckItem key={p} size="sm">
                  {p}
                </CheckItem>
              ))}
            </ul>
            {c.button?.href && (
              <Button href={c.button.href} variant="secondary" className="relative w-full">
                {c.button.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
