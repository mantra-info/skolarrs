import { img } from "@/sanity/lib/image";
import type { HomeDoc } from "@/sanity/lib/queries";

export default function JourneyCompare({ home }: { home: HomeDoc }) {
  const before = home.compareBefore ?? {};
  const after = home.compareAfter ?? {};
  return (
    <section className="relative overflow-hidden bg-[#f1f1f1] pt-16 md:pt-20 lg:h-[72.5rem]">
      {/* Decorative skylines, planes and students (positions are % of the 1920x1160 Figma frame) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-[33.28%_-56.53%_-58.88%_58.75%]">
          <img loading="lazy" src="/home/compare/skyline-right.svg" alt="" className="absolute inset-0 size-full" />
        </div>
        <div className="absolute inset-[33.28%_59.1%_-58.88%_-56.88%] -scale-x-100">
          <img loading="lazy" src="/home/compare/skyline-left.svg" alt="" className="absolute inset-0 size-full" />
        </div>
        <div className="absolute flex inset-[-11.81%_82.16%_41.72%_-24.11%] items-center justify-center" style={{ containerType: "size" }}>
          <img loading="lazy" src="/home/compare/plane-left.svg" alt="" className="h-[hypot(-42.4964cqw,39.958cqh)] w-[hypot(57.5036cqw,60.042cqh)] max-w-none flex-none rotate-[46.5deg]" />
        </div>
        <div className="absolute flex inset-[-11.64%_-18.07%_51.17%_81.87%] items-center justify-center" style={{ containerType: "size" }}>
          <img loading="lazy" src="/home/compare/plane-right.svg" alt="" className="h-[hypot(42.4964cqw,-39.958cqh)] w-[hypot(-57.5036cqw,-60.042cqh)] max-w-none flex-none rotate-[-133.5deg]" />
        </div>
        <img loading="lazy" src="/home/compare/girl-happy.webp" alt="" className="absolute top-[37.5625rem] left-[71.67%] h-[34.75rem] w-[29.5625rem] object-bottom" />
        <img loading="lazy" src="/home/compare/girl-confused.webp" alt="" className="absolute top-[37.75rem] left-[7.5%] h-[34.75rem] w-[29.5625rem] object-bottom" />
      </div>

      <div className="container-x relative flex flex-col items-center gap-6 pb-16 md:flex-row md:items-start md:justify-center lg:pb-0">
        <div className="flex w-full max-w-[26.6875rem] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-[2rem] bg-[#8c9bab] px-5 py-1 text-lg font-medium text-white md:text-h5">{before.badge}</span>
            <h3 className="w-[23.5625rem] max-w-full text-[2rem]/10 font-semibold tracking-[-0.01875rem] whitespace-pre-line text-heading md:text-h3">{before.title}</h3>
            <p className="text-h6 font-medium text-paragraph">{before.subtitle}</p>
          </div>
          <ul className="flex w-full flex-col gap-2">
            {(before.items ?? []).map((b) => (
              <li
                key={b._key}
                className="flex items-center gap-5 rounded-3xl border-[0.5px] border-[#cecece] bg-white px-6 py-3 text-h6 font-medium text-[#3c3c3c] drop-shadow-[0px_4px_7.5px_rgba(0,0,0,0.05)]"
              >
                {b.icon && <img loading="lazy" src={img(b.icon, 120)} alt="" className="size-[3.25rem] object-cover" />}
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full max-w-[26.6875rem] flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="bg-secondary-gradient rounded-[2rem] px-5 py-1 text-lg font-medium text-ink md:text-h5">{after.badge}</span>
            <h3 className="w-[23.5625rem] max-w-full text-[2rem]/10 font-semibold tracking-[-0.01875rem] whitespace-pre-line text-[#083a8c] md:text-h3">{after.title}</h3>
            <p className="text-h6 font-medium text-paragraph">{after.subtitle}</p>
          </div>
          <ul className="flex w-full flex-col gap-2">
            {(after.items ?? []).map((a) => (
              <li
                key={a._key}
                className={`flex items-center gap-5 rounded-3xl border-[0.5px] px-6 py-3 text-h6 font-medium text-white ${
                  a.green ? "border-[#164b35] bg-[#22a06b]" : "bg-primary-gradient border-[#083a8c]"
                }`}
              >
                {a.icon && <img loading="lazy" src={img(a.icon, 120)} alt="" className="size-[3.25rem] shrink-0 object-cover" />}
                {a.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
