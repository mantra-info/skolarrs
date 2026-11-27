"use client";

import { useState } from "react";

const inputCls =
  "h-[3.0625rem] w-full rounded-xl border-[0.5px] border-[#7079a4] px-5 text-sm tracking-[-0.01rem] text-heading outline-none placeholder:text-[#3b436d] focus:border-azure focus:ring-2 focus:ring-azure/20";

/** Enquiry form half of the contact section. */
export default function ContactForm({ title, body }: { title?: string; body?: string }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 bg-white p-6 md:p-7 lg:w-[42.9375rem] lg:shrink-0"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        e.currentTarget.reset();
      }}
    >
      <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">{title}</h2>
      <p className="max-w-[33.9375rem] text-sm leading-5 tracking-[-0.01rem] text-[#3c3c3c]">
        {body}
      </p>
      <span className="h-px w-full bg-[#e5e5e5]" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Name" aria-label="Name" className={inputCls} />
        <input required name="phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" className={inputCls} />
        <input required name="email" type="email" placeholder="Email Address" aria-label="Email Address" className={inputCls} />
        <input name="city" placeholder="City" aria-label="City" className={inputCls} />
      </div>
      <textarea name="message" placeholder="Write your message" aria-label="Message" className={`${inputCls} h-[7.1875rem] resize-none py-6`} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="bg-primary-gradient inline-flex h-[4.5rem] items-center gap-2.5 rounded-full px-10 text-h6 font-medium text-[color:var(--theme-btn-text,#fff)] transition hover:brightness-110"
        >
          Submit
          <img loading="lazy" src="/layout/arrow-white.svg" alt="" className="size-6 [filter:var(--theme-btn-art,none)]" />
        </button>
        {sent && <p className="text-label font-medium text-[#22a06b]">Thanks! Our counsellor will reach out shortly.</p>}
      </div>
    </form>
  );
}
