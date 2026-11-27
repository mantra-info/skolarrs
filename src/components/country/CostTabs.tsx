"use client";

import { useState } from "react";

type Item = { label: string; value: string };

export default function CostTabs({ study, living }: { study: Item[]; living: Item[] }) {
  const [tab, setTab] = useState<"study" | "living">("study");
  const items = tab === "study" ? study : living;
  return (
    <>
      <div className="flex gap-2">
        {(
          [
            ["study", "Cost of Study"],
            ["living", "Cost of Living"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`rounded-full px-6 py-4 text-h6 transition ${tab === key ? "bg-[color:var(--theme-tab)] font-semibold text-[color:var(--theme-tab-text)]" : "border-[0.5px] border-[color:var(--theme-cost-text,#fff)] text-[color:var(--theme-cost-text,#fff)] hover:bg-white/10"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mobile-rail grid w-full gap-3 [--rail-item:78%] sm:grid-cols-2 lg:grid-cols-5">
        {items.map((c) => (
          <div key={c.label} className="flex min-h-[17rem] flex-col md:min-h-[20.5625rem] items-center justify-between gap-6 rounded-2xl bg-white p-5">
            <span className="flex items-center justify-center rounded-full bg-white p-6">
              <img loading="lazy" src="/country/icon-fee.svg" alt="" className="size-[3.75rem]" />
            </span>
            <div className="flex w-full flex-col items-center gap-7">
              <p className="text-center text-h6 font-semibold text-ink max-md:[overflow-wrap:anywhere]">{c.label}</p>
              <span className="h-[0.3125rem] w-8 bg-[#f15b50]" />
              <p className="w-full rounded-xl bg-[#f1f1f1] p-2 text-center text-xl/[1.875rem] font-semibold tracking-[-0.009375rem] whitespace-nowrap text-ink max-md:text-lg max-md:whitespace-normal lg:text-h5">
                {c.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
