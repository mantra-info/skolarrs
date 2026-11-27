import Link from "next/link";
import { img } from "@/sanity/lib/image";
import type { HomeDoc } from "@/sanity/lib/queries";

function SmallCta({ href, label, variant }: { href: string; label: string; variant: "primary" | "secondary" }) {
  const primary = variant === "primary";
  return (
    <Link
      href={href}
      className={`promo-tile-button inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition hover:brightness-110 ${
        primary ? "bg-primary-gradient text-label text-white" : "bg-secondary-gradient text-h6 text-heading"
      }`}
    >
      {label}
      <img loading="lazy" src={primary ? "/layout/arrow-white.svg" : "/layout/arrow-dark.svg"} alt="" className="size-[1.25em]" />
    </Link>
  );
}

/** Copy offsets per tile position, matching the Figma layout. */
const COPY_POSITION = ["left-[5.58%] top-[14.6%]", "left-[5.97%] top-[14.39%]"];

export default function Banners({ home }: { home: HomeDoc }) {
  const banners = (home.banners ?? []).slice(0, 2);
  if (!banners.length) return null;

  return (
    <section className="container-x grid gap-5 py-16 md:py-20 lg:grid-cols-2">
      {banners.map((b, i) => (
        <div key={b._key} className="promo-tile relative aspect-[770/411] overflow-hidden rounded-xl">
          {b.image && <img loading="lazy" src={img(b.image, 1600)} alt="" className="absolute inset-0 size-full object-cover" />}
          <div className={`promo-tile-copy absolute flex w-[46%] flex-col ${COPY_POSITION[i]}`}>
            <h3 className="promo-tile-title font-semibold tracking-[-0.0125rem] text-black">
              {(b.heading ?? []).map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {line}
                </span>
              ))}
            </h3>
            {b.button?.href && <SmallCta href={b.button.href} label={b.button.label} variant={b.buttonStyle ?? "primary"} />}
          </div>
        </div>
      ))}
    </section>
  );
}
