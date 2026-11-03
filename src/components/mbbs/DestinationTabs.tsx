"use client";

import Link from "next/link";
import { useState } from "react";

export type Card = { name: string; image: string; href: string; flag?: string };


export default function DestinationTabs({ abroad, india }: { abroad: Card[]; india: Card[] }) {
  const [tab, setTab] = useState<"abroad" | "india">("abroad");
  const cards = tab === "abroad" ? abroad : india;
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
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
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
