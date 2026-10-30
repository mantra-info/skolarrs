type Logo = { src: string; w: number; h: number; crop?: boolean };

const ABROAD: Logo[] = [
  { src: "/partners/abroad/u1.webp", w: 173, h: 50 },
  { src: "/partners/abroad/u2.webp", w: 174, h: 50 },
  { src: "/partners/abroad/u3.webp", w: 173, h: 50 },
  { src: "/partners/abroad/u4.webp", w: 173, h: 50 },
  { src: "/partners/abroad/u5.webp", w: 174, h: 50 },
  { src: "/partners/abroad/u6.webp", w: 173, h: 50 },
  { src: "/partners/abroad/u7.webp", w: 173, h: 50 },
  { src: "/partners/abroad/u8.webp", w: 174, h: 50, crop: true },
  { src: "/partners/abroad/u9.webp", w: 173, h: 50 },
];

const INDIA: Logo[] = [
  { src: "/partners/india/i1.webp", w: 78, h: 73 },
  { src: "/partners/india/i2.webp", w: 63, h: 71 },
  { src: "/partners/india/i3.webp", w: 79, h: 79 },
  { src: "/partners/india/i4.webp", w: 122, h: 52 },
  { src: "/partners/india/i5.webp", w: 114, h: 69 },
  { src: "/partners/india/i6.webp", w: 76, h: 73 },
  { src: "/partners/india/i7.webp", w: 84, h: 72 },
  { src: "/partners/india/i8.webp", w: 75, h: 71 },
  { src: "/partners/india/i9.webp", w: 139, h: 67 },
];

function Marquee({ logos, gap, reverse }: { logos: Logo[]; gap: number; reverse?: boolean }) {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = [...logos, ...logos];
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="animate-marquee flex w-max items-center" style={{ gap: `${gap / 16}rem`, animationDirection: reverse ? "reverse" : undefined }}>
        {row.map((l, i) => (
          <div key={i} className="relative shrink-0 overflow-hidden" style={{ width: `${l.w / 16}rem`, height: `${l.h / 16}rem` }} aria-hidden={i >= logos.length}>
            {l.crop ? (
              <img loading="lazy" src={l.src} alt="" className="absolute top-0 left-[17.95%] h-full w-[64.1%] max-w-none" />
            ) : (
              <img loading="lazy" src={l.src} alt="" className="absolute inset-0 size-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="bg-white py-12 md:py-[3.75rem]">
      <div className="flex flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-[3.75rem] lg:pl-[max(1rem,calc((100vw-97.5rem)/2))] lg:pr-0">
        <div className="shrink-0 lg:w-[23.8125rem]">
          <p className="text-h2 font-semibold text-heading">1500+</p>
          <p className="text-[1.625rem]/[2.375rem] font-bold tracking-[-0.0125rem] text-heading md:text-h4">University Partners</p>
          <p className="text-[1.625rem]/[2.375rem] font-semibold tracking-[-0.0125rem] text-paragraph md:text-h4">For India &amp; Study Abroad Journey</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-10 md:gap-[3.75rem]">
          <Marquee logos={ABROAD} gap={37} />
          <Marquee logos={INDIA} gap={45} reverse />
        </div>
      </div>
    </section>
  );
}
