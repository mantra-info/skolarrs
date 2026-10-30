import Link from "next/link";

function SmallCta({ href, variant }: { href: string; variant: "primary" | "secondary" }) {
  const primary = variant === "primary";
  return (
    <Link
      href={href}
      className={`promo-tile-button inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition hover:brightness-110 ${
        primary ? "bg-primary-gradient text-label text-white" : "bg-secondary-gradient text-h6 text-heading"
      }`}
    >
      Apply Now
      <img loading="lazy" src={primary ? "/layout/arrow-white.svg" : "/layout/arrow-dark.svg"} alt="" className="size-[1.25em]" />
    </Link>
  );
}

export default function Banners() {
  return (
    <section className="container-x grid gap-5 py-16 md:py-20 lg:grid-cols-2">
      <div className="promo-tile relative aspect-[770/411] overflow-hidden rounded-xl">
        <img loading="lazy" src="/home/banners/mbbs.webp" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="promo-tile-copy absolute left-[5.58%] top-[14.6%] flex w-[46%] flex-col">
          <h3 className="promo-tile-title font-semibold tracking-[-0.0125rem] text-black">
            Make Your
            <br />
            MBBS Happen
          </h3>
          <SmallCta href="/study-mbbs" variant="primary" />
        </div>
      </div>
      <div className="promo-tile relative aspect-[770/411] overflow-hidden rounded-xl">
        <img loading="lazy" src="/home/banners/colleges.webp" alt="" className="absolute top-[-17.51%] left-[-2.35%] h-[131.04%] w-[104.77%] max-w-none object-cover" />
        <div className="promo-tile-copy absolute left-[5.97%] top-[14.39%] flex w-[46%] flex-col">
          <h3 className="promo-tile-title font-semibold tracking-[-0.0125rem] text-black">
            Best Colleges
            <br />
            Bright Futures
          </h3>
          <SmallCta href="/study-india" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
