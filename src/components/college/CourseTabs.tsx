"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Course = { title: string; body: string };

/** "Top Courses" UG/PG tabs with a horizontally scrolling card row and prev/next arrows. */
export default function CourseTabs({ title, ug, pg }: { title: string; ug: Course[]; pg: Course[] }) {
  const [tab, setTab] = useState<"ug" | "pg">("ug");
  const row = useRef<HTMLDivElement>(null);
  const courses = tab === "ug" ? ug : pg;
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * 395, behavior: "smooth" });

  return (
    <section className="overflow-hidden bg-[linear-gradient(to_top,#5ca9ff,#083abc)] py-16 md:py-20">
      <div className="container-x flex flex-col items-center gap-12">
        <h2 className="text-center text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-white md:text-h4">{title}</h2>
        <div className="flex gap-2" role="tablist">
          {(
            [
              ["ug", "UG Courses"],
              ["pg", "PG Courses"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => {
                setTab(key);
                row.current?.scrollTo({ left: 0 });
              }}
              className={`rounded-full px-6 py-4 text-h6 text-white transition ${tab === key ? "bg-[#d77a00] font-semibold" : "border-[0.5px] border-white hover:bg-white/10"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div ref={row} className="no-scrollbar mobile-rail flex w-full snap-x gap-5 overflow-x-auto [--rail-item:80%] max-md:gap-3">
          {courses.map((c) => (
            <div
              key={c.title}
              className="flex h-[19.875rem] w-[18.75rem] shrink-0 snap-start flex-col items-start justify-between rounded-3xl max-md:h-auto max-md:gap-5 max-md:min-h-[19.875rem] border-[0.5px] border-[#d6d6d6] bg-[#f1f1f1] px-5 py-6 md:w-[23.4375rem]"
            >
              <div className="flex flex-col gap-5 text-grey-500">
                <h3 className="text-h6 font-semibold">{c.title}</h3>
                <p className="text-label">{c.body}</p>
              </div>
              <Link
                href="/#contact"
                className="bg-primary-gradient inline-flex items-center gap-1 rounded-full px-4 py-2 text-label font-semibold text-white transition hover:brightness-110"
              >
                Apply Now
                <img loading="lazy" src="/layout/arrow-white.svg" alt="" className="size-[1.375rem]" />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir < 0 ? "Previous courses" : "Next courses"}
              onClick={() => scroll(dir)}
              className="flex size-[3.125rem] items-center justify-center rounded-full border border-white p-2.5 transition hover:bg-white/10"
            >
              <img loading="lazy" src="/layout/up.svg" alt="" className={`size-[1.875rem] ${dir < 0 ? "-rotate-90" : "rotate-90"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
