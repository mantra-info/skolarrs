"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

const SERVICES_ANSWER =
  "We offer complete guidance for both domestic and international education, including career counseling, university selection, admission support, application processing, visa assistance, scholarship guidance, education loans, accommodation support, and pre-departure assistance.";

export const DEFAULT_FAQS: Record<string, FaqItem[]> = {
  General: [
    { q: "What services does your consultancy provide?", a: SERVICES_ANSWER },
    {
      q: "Do you help with both abroad and Indian admissions?",
      a: "Yes. We support admissions to colleges and universities across India as well as study abroad programs in 45+ countries.",
    },
    {
      q: "Is career counseling available before choosing a course?",
      a: "Absolutely. Our counsellors help you understand your interests, strengths and career goals before shortlisting courses and institutions.",
    },
    {
      q: "How early should I start planning for higher studies?",
      a: "Ideally 12–18 months before your intended intake, so there is enough time for exams, applications, scholarships and visas.",
    },
  ],
  Admission: [
    {
      q: "Which entrance exams do you guide students for?",
      a: "We guide students through TNEA, NEET/MCC, state-level counselling and international tests such as IELTS, TOEFL, GRE and SAT.",
    },
    {
      q: "Can you help me shortlist colleges based on my marks?",
      a: "Yes. We match your academic profile, budget and preferences with suitable colleges and universities.",
    },
  ],
  Application: [
    {
      q: "Do you help prepare SOPs and LORs?",
      a: "Yes. Our team reviews and helps you refine statements of purpose, letters of recommendation and resumes.",
    },
    {
      q: "How many universities should I apply to?",
      a: "Most students apply to 5–8 universities with a balanced mix of ambitious, target and safe options.",
    },
  ],
  Visa: [
    {
      q: "Do you assist with student visa applications?",
      a: "Yes. We help with documentation, financial proofs, interview preparation and filing timelines for your destination country.",
    },
  ],
  "Scholarship & Financial": [
    {
      q: "Can you help me find scholarships?",
      a: "Yes. We identify merit and need-based scholarships offered by universities, governments and private foundations.",
    },
    {
      q: "Do you help with education loans?",
      a: "We work with 20+ leading banks and lenders to structure education loans that suit your university and budget.",
    },
  ],
};

type Props = {
  title?: string;
  description?: string;
  faqs?: Record<string, FaqItem[]>;
  className?: string;
};

export default function Faq({
  title = "Let’s Clear Some Doubts",
  description = "From application guidance to visa assistance, we’ve answered the most common questions to help you take the next step with clarity and confidence.",
  faqs = DEFAULT_FAQS,
  className = "",
}: Props) {
  const tabs = Object.keys(faqs);
  const [tab, setTab] = useState(tabs[0]);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`container-x flex flex-col items-center gap-12 pt-16 pb-10 md:pt-20 ${className}`}>
      <div className="flex flex-col items-center gap-7">
        <div className="flex max-w-[61.4375rem] flex-col items-center gap-4 text-center">
          <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">{title}</h2>
          <p className="text-base text-[#777] md:text-h6">{description}</p>
        </div>
        {tabs.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setOpen(0);
                }}
                className={`rounded-full px-6 py-4 text-base transition md:text-h6 ${
                  tab === t ? "bg-[#d77a00] font-semibold text-white" : "border-[0.5px] border-grey-500 text-grey-500 hover:bg-black/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-6">
        <span className="h-px w-full bg-[#e5e5e5]" />
        <div className="flex flex-col gap-2">
          {faqs[tab].map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b-[0.5px] border-[#cecece]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 pr-5 text-left text-base font-medium text-ink md:text-h6"
                >
                  {f.q}
                  <img loading="lazy" src="/icons/plus.svg" alt="" className={`size-6 shrink-0 transition-transform ${isOpen ? "rotate-[-135deg]" : "rotate-90"}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-base text-[#5e5b59] md:text-h6">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
