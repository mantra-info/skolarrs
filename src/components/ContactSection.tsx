"use client";

import { useState } from "react";

const inputCls =
  "h-[3.0625rem] w-full rounded-xl border-[0.5px] border-[#7079a4] px-5 text-sm tracking-[-0.01rem] text-heading outline-none placeholder:text-[#3b436d] focus:border-azure focus:ring-2 focus:ring-azure/20";

const CONTACTS = [
  { label: "+91 97904 44443", href: "tel:+919790444443" },
  { label: "0422 - 437 00 44", href: "tel:04224370044" },
  { label: "info@skolarrssolutions.com", href: "mailto:info@skolarrssolutions.com" },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="scroll-mt-8 bg-surface pt-16 pb-10 md:pt-20">
      <div className="container-x flex flex-col items-center gap-5">
        <div className="flex w-full max-w-[82.6875rem] flex-col overflow-hidden rounded-3xl lg:flex-row">
          <form
            className="flex flex-col gap-4 bg-white p-6 md:p-7 lg:w-[42.9375rem] lg:shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              e.currentTarget.reset();
            }}
          >
            <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">Get In Touch</h2>
            <p className="max-w-[33.9375rem] text-sm leading-5 tracking-[-0.01rem] text-[#3c3c3c]">
              Our expert counselors are here to guide you through every step of your domestic and international education journey.
            </p>
            <span className="h-px w-full bg-[#e5e5e5]" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Name" aria-label="Name" className={inputCls} />
              <input required name="phone" type="tel" placeholder="Phone Number" aria-label="Phone Number" className={inputCls} />
              <input required name="email" type="email" placeholder="Email Address" aria-label="Email Address" className={inputCls} />
              <input name="city" placeholder="City" aria-label="City" className={inputCls} />
            </div>
            <textarea name="message" placeholder="Write your mesaage" aria-label="Message" className={`${inputCls} h-[7.1875rem] resize-none py-6`} />
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

          <a
            href="https://maps.google.com/?q=The+Grand+Hub+Avinashi+Road+Peelamedu+Coimbatore"
            target="_blank"
            rel="noreferrer"
            aria-label="Open our location in Google Maps"
            className="relative block h-[20rem] overflow-hidden bg-white lg:h-[33.375rem] lg:w-[39.75rem] lg:rounded-r-2xl"
          >
            <img loading="lazy" src="/contact/map.webp" alt="" className="absolute top-[-0.5625rem] left-[-1.66688rem] h-[36rem] w-[43.0833rem] max-w-none object-cover" />
            <img loading="lazy" src="/contact/pin.svg" alt="" className="absolute top-[45%] left-[42%] h-[2.1875rem] w-7 lg:top-[14.5rem] lg:left-[16.0312rem]" />
          </a>
        </div>

        <div className="flex w-full max-w-[82.625rem] flex-col items-center justify-between gap-4 py-5 lg:flex-row">
          <p className="px-2 py-4 text-[1.625rem]/[2.375rem] font-semibold tracking-[-0.0125rem] text-[#2b2827] md:text-h4">Need Assistance?</p>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[2.1875rem]">
            {CONTACTS.map((c, i) => (
              <div key={c.label} className="flex items-center gap-[2.1875rem]">
                {i > 0 && <span className="hidden h-[3.125rem] w-px bg-[#cecece] lg:block" />}
                <a href={c.href} className="group flex items-center gap-2.5 text-xl/[1.875rem] font-semibold tracking-[-0.009375rem] text-[#2b2827] md:text-h5">
                  {c.label}
                  <img loading="lazy" src="/icons/arrow-orange.svg" alt="" className="size-[1.875rem] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
