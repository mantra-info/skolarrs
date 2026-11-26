"use client";

import Link from "next/link";
import { useState } from "react";

export type University = { name: string; logo: string; h: number; crop?: string; href?: string };

/**
 * Blue section listing universities as logo cards in two columns (Figma "Frame 496").
 * With `pageSize`, cards are paged and the round prev/next arrows become active.
 */
export default function UniversityList({
  title,
  intro,
  items,
  radius = "rounded-3xl",
  pageSize,
  wide,
}: {
  title: string;
  intro?: string;
  items: University[];
  radius?: string;
  pageSize?: number;
  wide?: boolean;
}) {
  const size = pageSize ?? items.length;
  const pages = Math.max(1, Math.ceil(items.length / size));
  const [page, setPage] = useState(0);
  const visible = items.slice(page * size, page * size + size);
  const half = Math.ceil(visible.length / 2);

  return (
    <section className="bg-[linear-gradient(to_top,#5ca9ff,#083abc)] py-16 md:py-20">
      <div className="container-x flex flex-col items-center gap-7">
        <h2 className="text-center text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-white md:text-h4">{title}</h2>
        {intro && <p className="text-center text-base text-white md:text-h6">{intro}</p>}
        <div className={`grid w-full gap-3 lg:grid-cols-2 ${wide ? "" : "max-w-[75.75rem]"}`}>
          {[visible.slice(0, half), visible.slice(half)].map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-col gap-3">
              {col.map((u) => (
                <Link
                  key={u.name}
                  href={u.href ?? "/#contact"}
                  className={`group flex min-h-[5.9375rem] items-center gap-3 lg:gap-5 ${radius} border-[0.5px] border-[#e3e3e3] bg-white px-5 py-4 transition hover:shadow-lg`}
                >
                  <span className="relative w-16 sm:w-[7.5rem] shrink-0 overflow-hidden" style={{ height: `${u.h / 16}rem` }}>
                    <img loading="lazy" src={u.logo} alt="" className={`absolute max-w-none ${u.crop ?? "inset-0 size-full object-contain"}`} />
                  </span>
                  <span className="min-w-0 flex-1 break-words text-h6 font-semibold text-grey-500">{u.name}</span>
                  <img loading="lazy" src="/icons/arrow-uni.svg" alt="" className="size-6 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          ))}
        </div>
        {pageSize && (
          <div className="flex gap-3">
            {[-1, 1].map((dir) => {
              const disabled = dir < 0 ? page === 0 : page >= pages - 1;
              return (
                <button
                  key={dir}
                  type="button"
                  aria-label={dir < 0 ? "Previous" : "Next"}
                  disabled={disabled}
                  onClick={() => setPage((p) => p + dir)}
                  className="flex size-[3.125rem] items-center justify-center rounded-full border border-white p-2.5 transition hover:bg-white/10 disabled:opacity-40"
                >
                  <img loading="lazy" src="/layout/up.svg" alt="" className={`size-[1.875rem] ${dir < 0 ? "-rotate-90" : "rotate-90"}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
