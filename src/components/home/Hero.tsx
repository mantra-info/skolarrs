"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Linework from "@/components/Linework";

import type { HeroSlideDoc } from "@/sanity/lib/queries";

/** Absolutely positioned artwork laid out on the 1920x1080 Figma frame. */
function Abroad() {
  return (
    <>
      <div className="absolute contents inset-[-8.61%_-4.88%_33.33%_62.92%]" style={{ containerType: "size" }}>
        <div className="absolute flex inset-[17.15%_32.84%_77.05%_63.91%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(48.2203cqw,-45.6111cqh)] rotate-[-133.5deg] w-[hypot(-51.7797cqw,-54.3889cqh)]">
            <img alt="" src="/home/hero/plane-a1.svg" className="block size-full max-w-none" />
          </div>
        </div>
        <div className="absolute flex inset-[23.65%_32.94%_74.57%_66.05%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(53.3061cqw,-50.6912cqh)] rotate-[-133.5deg] w-[hypot(-46.6939cqw,-49.3088cqh)]">
            <img alt="" src="/home/hero/plane-a2.svg" className="block size-full max-w-none" />
          </div>
        </div>
        <div className="absolute flex inset-[-5.46%_-4.88%_33.33%_64.6%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[hypot(44.2736cqw,-41.706cqh)] rotate-[-133.5deg] w-[hypot(-55.7264cqw,-58.294cqh)]">
            <img alt="" src="/home/hero/plane-a3.svg" className="block size-full max-w-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[83.38%_80.36%_11.54%_16.57%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-19.1457cqw,76.7339cqh)] rotate-15 w-[hypot(80.8543cqw,23.2661cqh)]">
          <img alt="" src="/home/hero/plane-b1.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute flex inset-[82.08%_83.75%_16.26%_15.36%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-22.4973cqw,80.1707cqh)] rotate-15 w-[hypot(77.5027cqw,19.8293cqh)]">
          <img alt="" src="/home/hero/plane-b2.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute flex inset-[65.19%_82.47%_-25.21%_-22.19%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-16.8063cqw,73.7787cqh)] rotate-15 w-[hypot(83.1937cqw,26.2213cqh)]">
          <img alt="" src="/home/hero/plane-b3.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <Linework className="top-[18.1875rem] left-[15.5rem] h-[91.0625rem] w-[117.334rem] opacity-[0.21]" />
      <img alt="" src="/home/hero/student-laptop.webp" className="absolute top-[21.5625rem] left-[83.5625rem] h-[51.1875rem] w-[35.0625rem] object-cover" />
      <div className="absolute top-[19.1875rem] left-[43.5625rem] aspect-[540/744] w-[36.4875rem] overflow-hidden">
        <img alt="" src="/home/hero/abroad-1.webp" className="absolute top-[-0.04%] left-0 h-[103.83%] w-full max-w-none" />
      </div>
      <img alt="" src="/home/hero/abroad-2.webp" className="absolute top-[18.2569rem] left-[60.78rem] h-[50.4746rem] w-[44.0559rem] object-bottom" />
    </>
  );
}

function Domestic() {
  return (
    <>
      <div className="absolute top-[-18.3956rem] left-[-5.62125rem] flex h-[111.871rem] w-[182.237rem] items-center justify-center">
        <img alt="" src="/home/hero/domestic-wave.svg" className="h-[65.9806rem] w-[170.5rem] max-w-none flex-none rotate-[-16.57deg]" />
      </div>
      <div className="absolute top-[11.1862rem] left-[4.06375rem] flex h-[19rem] w-[9.37294rem] items-center justify-center">
        <img alt="" src="/home/hero/domestic-dots.svg" className="h-[9.37294rem] w-[19rem] max-w-none flex-none rotate-90" />
      </div>
      <div className="absolute top-[23rem] left-[110.188rem] flex h-[12.5428rem] w-[6.18756rem] items-center justify-center">
        <img alt="" src="/home/hero/domestic-dots-2.svg" className="h-[6.18756rem] w-[12.5428rem] max-w-none flex-none rotate-90" />
      </div>
      <img alt="" src="/home/hero/domestic.webp" className="absolute top-[2.875rem] left-[37.125rem] h-[64.625rem] w-[87.75rem] object-contain object-bottom" />
    </>
  );
}

/** Artwork and default background for each slide design. Text, button and colours come from the CMS. */
const DESIGNS: Record<HeroSlideDoc["design"], { background: string; art: React.ReactNode }> = {
  abroad: { background: "linear-gradient(-56.785deg, rgb(92,169,255) 3.35%, rgb(35,94,209) 31.53%, rgb(8,58,188) 69.13%)", art: <Abroad /> },
  domestic: { background: "linear-gradient(to top, #ffe168, #fdc730)", art: <Domestic /> },
  mbbs: {
    background: "linear-gradient(249.92deg, rgb(17,211,193) 8.06%, rgb(0,88,80) 125.35%)",
    art: <img alt="" src="/home/hero/mbbs.webp" className="absolute top-[3.75rem] left-[49.875rem] h-[63.75rem] w-[62.875rem] object-contain object-bottom" />,
  },
  law: {
    background: "linear-gradient(118.47deg, rgb(72,41,26) 0%, rgb(126,66,36) 54.57%, rgb(205,128,90) 99.16%)",
    art: <img alt="" src="/home/hero/law.webp" className="absolute top-[9.625rem] left-[60rem] h-[60.9375rem] w-[49.3125rem] object-contain object-bottom" />,
  },
};

function background(s: HeroSlideDoc) {
  if (s.backgroundFrom && s.backgroundTo) return `linear-gradient(-56deg, ${s.backgroundTo}, ${s.backgroundFrom})`;
  if (s.backgroundFrom || s.backgroundTo) return `linear-gradient(${s.backgroundFrom ?? s.backgroundTo}, ${s.backgroundFrom ?? s.backgroundTo})`;
  return DESIGNS[s.design]?.background ?? DESIGNS.abroad.background;
}

export default function Hero({ slides }: { slides: HeroSlideDoc[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [active, slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative h-[45rem] overflow-hidden md:h-[37.5rem] lg:h-[67.5rem]">
      {slides.map((s, i) => (
        <div
          key={s._key}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ backgroundImage: background(s) }}
        >
          {/* Decorative artwork: desktop dimensions follow the fluid root; mobile has its own crop */}
          <div className="absolute right-0 bottom-0 h-[67.5rem] w-[120rem] origin-bottom-right scale-[0.4] overflow-hidden md:scale-[0.5] lg:scale-100">
            {DESIGNS[s.design]?.art}
          </div>

          <div className="container-x relative pt-32 md:pt-48 lg:pt-[20.5625rem]">
            <h1 className={`text-[2.75rem]/[1.2] font-bold tracking-[-0.05rem] md:text-[3.5rem] lg:text-title-1 ${s.darkText ? "text-ink" : "text-white"}`}>
              {[s.line1, s.line2, s.line3].filter(Boolean).map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
              {s.accent && <span className="ml-2.5 text-[2.375rem] font-normal text-gold md:text-[3rem] lg:text-title-2"> {s.accent}</span>}
            </h1>
            {s.subtitle && <p className={`mt-6 text-base font-medium md:text-h6 ${s.darkText ? "text-ink" : "text-soft-yellow"}`}>{s.subtitle}</p>}
            {s.button?.href && (
              <div className="mt-9">
                <Button href={s.button.href} variant={s.buttonStyle ?? "primary"}>
                  {s.button.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="container-x absolute inset-x-0 bottom-8 md:bottom-12 lg:bottom-[4.8125rem]">
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s._key}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-[1.1875rem] rounded-full bg-white transition-all ${i === active ? "w-[3.125rem]" : "w-[1.3125rem] opacity-[0.28]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
