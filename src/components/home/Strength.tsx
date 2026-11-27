import Button from "@/components/Button";
import CheckItem from "@/components/CheckItem";
import SimpleText from "@/components/SimpleText";
import { img } from "@/sanity/lib/image";
import type { HomeDoc } from "@/sanity/lib/queries";

export function StatCards({ stats = [] }: { stats?: HomeDoc["strengthStats"] }) {
  if (!stats.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div
          key={s._key}
          className="relative flex h-[17.5rem] flex-col items-center justify-between overflow-hidden rounded-[2rem] border-[0.5px] border-paragraph p-8 md:h-[21.875rem] md:p-12"
          style={{ backgroundColor: s.color ?? "#163e78" }}
        >
          <img loading="lazy" src="/home/strength/card-texture.webp" alt="" className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.16]" />
          {s.icon ? <img loading="lazy" src={img(s.icon, 120)} alt="" className="relative size-[3.75rem]" /> : <span className="size-[3.75rem]" />}
          <div className="relative flex flex-col items-center gap-3 text-center text-white">
            <p className="text-[2rem]/[2.5rem] font-semibold tracking-[-0.01875rem] md:text-h3">{s.value}</p>
            <p className="text-lg/6 font-medium md:text-h5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Strength({ home }: { home: HomeDoc }) {
  const photo = home.strengthPhoto;
  return (
    <section className="container-x flex flex-col gap-10 py-16 md:py-[6.25rem]">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-8 md:gap-[3.75rem]">
            <h2 className="text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] text-ink md:text-h2">{home.strengthTitle}</h2>
            <div className="flex flex-col gap-4">
              <SimpleText value={home.strengthBody} className="text-base text-grey-500 md:text-h6" />
            </div>
          </div>
          {!!home.strengthPoints?.length && (
            <ul className="grid gap-x-6 gap-y-8 text-h6 font-medium text-grey-500 sm:grid-cols-2">
              {home.strengthPoints.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </ul>
          )}
          {home.strengthButton?.href && (
            <div>
              <Button href={home.strengthButton.href}>{home.strengthButton.label}</Button>
            </div>
          )}
        </div>
        {photo && (
          <div className="relative min-h-[22.5rem] flex-1 overflow-hidden rounded-2xl">
            <img loading="lazy" src={img(photo, 1600)} alt={photo.alt ?? ""} className="absolute inset-0 size-full object-cover" />
          </div>
        )}
      </div>
      <img loading="lazy" src="/icons/divider.svg" alt="" className="h-px w-full rotate-180" />
      <StatCards stats={home.strengthStats} />
    </section>
  );
}
