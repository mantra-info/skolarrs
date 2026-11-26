export type PhotoStep = { title: string; body: string; color: string; image: string; bar?: string };

/** Journey steps as photo cards in a 3-column grid (Figma "Steps" photo variant). */
export default function PhotoSteps({ title, steps }: { title: string; steps: PhotoStep[] }) {
  return (
    <section className="bg-[#fafafa] py-16 md:py-20">
      <div className="container-x flex flex-col items-center gap-10">
        <h2 className="text-center text-[1.625rem]/8 font-bold tracking-[-0.0125rem] text-ink md:text-h4">{title}</h2>
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="flex h-[29.75rem] flex-col gap-6 rounded-3xl border-[0.5px] bg-white p-5" style={{ borderColor: s.color }}>
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl">
                <img loading="lazy" src={s.image} alt="" className="absolute inset-0 size-full object-cover" />
              </div>
              <h3 className="text-h5 font-semibold text-ink">{s.title}</h3>
              <span className="h-1.5 w-[1.375rem]" style={{ backgroundColor: s.bar ?? s.color }} />
              <p className="min-h-[3.75rem] text-h6 text-ink">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
