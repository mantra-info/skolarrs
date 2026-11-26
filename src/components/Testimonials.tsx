const DEFAULT_CARDS = ["t0", "t1", "t2", "t3", "t4", "t0", "t3"];

/** "Real Stories, Real Success" video-testimonial strip (Figma "Frame 528"). */
export default function Testimonials({
  title = "Real Stories, Real Success",
  body = "Our expert guidance has helped students confidently secure seats at top colleges, navigate complex admissions, and achieve their dream careers — stress-free and on time.",
  cards = DEFAULT_CARDS,
}: {
  title?: string;
  body?: string;
  cards?: string[];
}) {
  return (
    <section className="overflow-hidden [background:var(--theme-section,linear-gradient(to_top,#5ca9ff,#083abc))] py-16 md:py-20">
      <div className="container-x flex flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5">
          <h2 className="text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-[color:var(--theme-section-text,#fff)] md:text-h3">{title}</h2>
          <p className="text-label text-[color:var(--theme-section-text,#fdfdfd)]">{body}</p>
        </div>
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto">
          {cards.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label="Play student testimonial"
              className="group relative h-[28.125rem] w-[18.75rem] shrink-0 snap-start overflow-hidden rounded-xl bg-white"
            >
              <img loading="lazy" src="/testimonials/t0.webp" alt="" className="absolute inset-0 size-full object-cover" />
              <img loading="lazy" src={`/testimonials/${c}.webp`} alt="" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute top-[12.6875rem] left-[7.625rem] flex size-[3.5625rem] items-center justify-center rounded-full border-[0.5px] border-white bg-white/20 p-2.5 backdrop-blur-sm transition group-hover:bg-white/35">
                <img loading="lazy" src="/icons/play.svg" alt="" className="size-6" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
