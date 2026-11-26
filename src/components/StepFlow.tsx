export type Step = { title: string; body: string; color: string };

/** Numbered step cards joined by flow arrows (Figma "Steps" component). */
export default function StepFlow({ title, steps, className = "bg-[#fafafa]" }: { title: string; steps: Step[]; className?: string }) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container-x flex flex-col items-center gap-[4.5rem]">
        <h2 className="text-center text-[1.625rem]/8 font-bold tracking-[-0.0125rem] text-ink md:text-h4">{title}</h2>
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-16 sm:grid-cols-2 lg:flex lg:items-stretch lg:justify-between">
          {steps.map((s, i) => (
            <div key={s.title} className="contents">
              {i > 0 && (
                <img
                  loading="lazy"
                  src={i === 1 ? "/icons/flow-arrow-first.svg" : "/icons/flow-arrow.svg"}
                  alt=""
                  className="hidden size-[2.375rem] shrink-0 self-center lg:block"
                />
              )}
              <div
                className="relative flex flex-col items-center gap-6 rounded-3xl border-[0.5px] bg-white px-6 pt-[4.5rem] pb-4 text-center lg:min-w-0 lg:flex-1"
                style={{ borderColor: s.color }}
              >
                <span
                  className="absolute top-[-2.46875rem] left-1/2 flex size-[4.875rem] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white text-h6 font-semibold text-white drop-shadow-[0px_11px_10.4px_rgba(0,0,0,0.15)]"
                  style={{ backgroundColor: s.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h5 font-semibold text-ink">{s.title}</h3>
                <span className="h-1.5 w-[1.375rem]" style={{ backgroundColor: s.color }} />
                <p className="max-w-[11.125rem] text-h6 text-ink">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
