"use client";

import { useId, useState } from "react";

/**
 * Footer link group. Below `sm` it collapses into an accordion so the mobile
 * footer stays short; from `sm` up it is always expanded and the toggle is inert.
 */
export default function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-white/10 sm:border-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-4 text-left text-h6 font-semibold text-gold sm:pointer-events-none sm:cursor-default sm:py-5"
      >
        {title}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`size-5 shrink-0 transition-transform sm:hidden ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div id={id} className={`${open ? "block" : "hidden"} pb-3 sm:block sm:pb-0`}>
        {children}
      </div>
    </div>
  );
}
