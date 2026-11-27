import Link from "next/link";
import Button from "@/components/Button";
import { img } from "@/sanity/lib/image";
import type { HomeDoc } from "@/sanity/lib/queries";

export default function TrendingCourses({ home }: { home: HomeDoc }) {
  const courses = home.courses ?? [];
  if (!courses.length) return null;

  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="container-x flex flex-col items-center gap-12">
        <h2 className="text-center text-[1.875rem]/[2.375rem] font-bold tracking-[-0.01875rem] text-ink md:text-h3">{home.coursesTitle}</h2>
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {courses.map((c) => (
            <Link
              key={c._key}
              href={c.href || "/study-india"}
              className="group flex flex-col overflow-hidden rounded-xl transition hover:-translate-y-1 lg:h-[28.4375rem]"
              style={{ backgroundColor: c.color ?? "#0057db" }}
            >
              <div className="relative h-[17.0625rem] shrink-0 overflow-hidden" style={{ background: c.photoBackground ?? "transparent" }}>
                {c.photo && <img loading="lazy" src={img(c.photo, 700)} alt="" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />}
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-5">
                <div className="flex flex-col gap-3">
                  {c.icon && <img loading="lazy" src={img(c.icon, 80)} alt="" className="size-9" />}
                  <p className="text-h6 font-semibold text-white">{c.title}</p>
                </div>
                <p className="text-sm leading-5 tracking-[-0.01rem] text-white">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {home.coursesButton?.href && (
          <Button href={home.coursesButton.href} variant="secondary">
            {home.coursesButton.label}
          </Button>
        )}
      </div>
    </section>
  );
}
