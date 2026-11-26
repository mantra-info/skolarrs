import Link from "next/link";
import Button from "./Button";
import HeroSlides from "./HeroSlides";

/** Full-bleed photo hero with breadcrumb and centred title (country / MBBS destination pages). */
export default function CenteredHero({
  image,
  slides,
  imageClass = "inset-0 size-full object-cover",
  crumbs,
  title,
  titleTop = 357,
}: {
  image?: string;
  /** Several photos that cross-fade instead of a single `image`. */
  slides?: string[];
  imageClass?: string;
  crumbs: { label: string; href?: string }[];
  title: React.ReactNode;
  titleTop?: number;
}) {
  return (
    <section className="relative h-[42.5rem] overflow-hidden bg-royal md:h-[37.5rem] lg:h-[50rem]">
      {slides ? <HeroSlides images={slides} /> : <img src={image} alt="" className={`absolute max-w-none ${imageClass}`} />}
      <div
        className="container-x relative flex h-full flex-col items-center justify-center pt-24 text-center lg:justify-start lg:pt-[var(--crumb-top)]"
        style={{ "--crumb-top": `${(titleTop - 70) / 16}rem` } as React.CSSProperties}
      >
        <nav aria-label="Breadcrumb" className="flex flex-wrap justify-center items-center text-base font-medium text-white">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center">
              {i > 0 && <span className="px-1 py-2.5">/</span>}
              {c.href ? (
                <Link href={c.href} className="px-1 py-2.5 text-[#fdfdfd] hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span className="px-1 py-2.5">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex w-[48.4375rem] max-w-full flex-col items-center gap-[1.625rem]">
          <h1 className="text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] text-white md:text-h2">{title}</h1>
          <Button href="/#contact">Book Your Seat Now</Button>
        </div>
      </div>
    </section>
  );
}
