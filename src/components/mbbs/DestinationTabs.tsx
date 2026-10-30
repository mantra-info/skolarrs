"use client";

import Link from "next/link";
import { useState } from "react";

type Card = { name: string; image: string; href: string; flag?: string; crop?: string };

const ABROAD: Card[] = [
  { name: "Russia", image: "/mbbs/abroad/russia.webp", flag: "/mbbs/flags/russia.svg", href: "/study-mbbs/russia" },
  { name: "Georgia", image: "/mbbs/abroad/georgia.webp", flag: "/mbbs/flags/georgia.svg", href: "/#contact" },
  {
    name: "Uzbekistan",
    image: "/mbbs/abroad/uzbekistan.webp",
    flag: "/mbbs/flags/uzbekistan.svg",
    href: "/#contact",
    crop: "top-[-1.84%] left-[-16%] h-[103.68%] w-[127.47%]",
  },
  { name: "Kyrgyzstan", image: "/mbbs/abroad/kyrgyzstan.webp", flag: "/mbbs/flags/kyrgyzstan.svg", href: "/#contact" },
  { name: "Tajikistan", image: "/mbbs/abroad/tajikistan.webp", flag: "/mbbs/flags/tajikistan.svg", href: "/#contact" },
  { name: "Vietnam", image: "/mbbs/abroad/vietnam.webp", flag: "/mbbs/flags/vietnam.svg", href: "/#contact" },
  { name: "Timor-Leste", image: "/mbbs/abroad/timor-leste.webp", flag: "/mbbs/flags/timor-leste.svg", href: "/#contact" },
];

const INDIA: Card[] = [
  { name: "Private Medical Colleges", image: "/mbbs/india/private.webp", href: "/study-mbbs/private-medical-colleges" },
  { name: "State Private Medical Colleges", image: "/mbbs/india/state-private.webp", href: "/study-mbbs/private-medical-colleges" },
  { name: "Deemed Universities", image: "/mbbs/india/deemed.webp", href: "/#contact" },
];

export default function DestinationTabs() {
  const [tab, setTab] = useState<"abroad" | "india">("abroad");
  const cards = tab === "abroad" ? ABROAD : INDIA;
  return (
    <section className="container-x flex flex-col items-center gap-10 py-16 md:py-20">
      <h2 className="text-center text-[1.875rem]/[2.375rem] font-semibold tracking-[-0.01875rem] text-ink md:text-h3">Find Your MBBS Study Destination</h2>
      <p className="text-center text-base text-[#3c3c3c] md:text-h6">
        We help you identify the best options based on your academic profile, budget, and career goals. Discover top MBBS destinations and take a confident step
        toward becoming a future healthcare professional.
      </p>
      <div className="flex gap-2" role="tablist">
        {(
          [
            ["abroad", "MBBS Abroad"],
            ["india", "MBBS India"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-full px-6 py-4 text-h6 transition ${tab === key ? "bg-[#d77a00] font-semibold text-white" : "border-[0.5px] border-grey-500 text-grey-500 hover:bg-black/5"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={`grid w-full gap-x-5 gap-y-[2.3125rem] sm:grid-cols-2 ${tab === "abroad" ? "lg:grid-cols-4" : "max-w-[72.8125rem] lg:grid-cols-3"}`}>
        {cards.map((c) => (
          <Link key={c.name} href={c.href} className="group flex flex-col items-center gap-6">
            <div className="relative h-[17.5625rem] w-full overflow-hidden rounded-3xl">
              <img
                loading="lazy"
                src={c.image}
                alt={c.name}
                className={`absolute max-w-none transition duration-500 group-hover:scale-105 ${c.crop ?? "inset-0 size-full object-cover"}`}
              />
            </div>
            <span className="flex items-center gap-2 text-h6 font-semibold text-ink group-hover:text-royal">
              {c.flag && <img loading="lazy" src={c.flag} alt="" className="size-[1.5625rem]" />}
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
