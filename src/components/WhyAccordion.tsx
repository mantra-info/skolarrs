"use client";

import { useState } from "react";

/** Numbered accordion beside a photo (Figma "Why Skolarrs?" / "Frame 589"). The open item gets the gold treatment. */
export default function WhyAccordion({ title = "Why Skolarrs?", items, image }: { title?: string; items: { title: string; body: string }[]; image: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="container-x py-10">
      <div className="flex flex-col gap-10 p-5">
        <h2 className="text-[1.625rem]/8 font-semibold tracking-[-0.0125rem] text-ink md:text-h4">{title}</h2>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[3.75rem]">
          <ol className="flex flex-1 flex-col gap-2 text-grey-500">
            {items.map((it, i) => {
              const active = open === i;
              return (
                <li key={it.title}>
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setOpen(i)}
                    className={`flex w-full flex-col gap-4 rounded-[0.125rem] px-6 py-4 text-left transition ${
                      active ? "bg-secondary-gradient border-l-[6px] border-[#e7a700]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <span className="text-h6 font-bold">
                      {i + 1}. {it.title}
                    </span>
                    {active && <span className="text-label">{it.body}</span>}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="relative min-h-[20rem] flex-1 overflow-hidden rounded">
            <img loading="lazy" src={image} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
