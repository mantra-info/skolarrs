import Link from "next/link";
import Button from "./Button";
import FooterSection from "./FooterSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SETTINGS, telHref, type SettingsDoc } from "@/sanity/lib/queries";

type Col = { title: string; links: { label: string; href: string }[] };

const COMPANY: Col[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "How We Help", href: "/services" },
      { label: "Study Destinations", href: "/study-abroad" },
      { label: "Course Search", href: "/study-india" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About Us", href: "/about" },
      { label: "News", href: "/#blogs" },
      { label: "Updates", href: "/#events" },
    ],
  },
];

const COUNTRIES: Col = {
  title: "Top Countries",
  links: ["Germany", "France", "USA", "United Kingdom", "India", "Russia", "New Zealand", "Australia", "All Countries"].map((c) => ({
    label: c,
    href:
      c === "India"
        ? "/study-india"
        : c === "Russia"
          ? "/study-mbbs/russia"
          : c === "All Countries" || c === "New Zealand"
            ? "/study-abroad"
            : `/study-abroad/${c.toLowerCase().replace(/\s+/g, "-")}`,
  })),
};

const HELP: Col = {
  title: "How We Help",
  links: ["Counselling", "Test Preparation", "Country & Course Selection", "Application & Admission", "Scholarships", "Education Loan", "Visa Processing"].map((l) => ({
    label: l,
    href: "/services",
  })),
};

/** Icons for the social networks editors can add in Site settings. */
const SOCIAL_ICONS: Record<string, { src: string; w: number; h: number }> = {
  Facebook: { src: "/layout/facebook.svg", w: 18.66, h: 32.74 },
  Instagram: { src: "/layout/instagram.svg", w: 28.06, h: 28.06 },
  WhatsApp: { src: "/layout/whatsapp.svg", w: 32.92, h: 32.74 },
  YouTube: { src: "/layout/youtube.svg", w: 41.63, h: 28.06 },
};

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="px-4 pt-4 pb-2 text-h6 font-semibold text-gold sm:py-5">{children}</p>;
}

const CONTACT_LINK = "block break-words px-4 py-2.5 text-h6 font-medium text-white hover:text-gold sm:py-2";

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-4 py-2 text-h6 font-medium lg:whitespace-nowrap text-white transition hover:text-gold">
      {children}
    </Link>
  );
}

function Divider() {
  return <span aria-hidden className="hidden h-[3.375rem] w-px bg-white/20 md:block" />;
}

export default async function Footer() {
  const settings = (await sanityFetch<SettingsDoc | null>({ query: SETTINGS, tags: ["siteSettings"] })) ?? {};
  const social = (settings.socials ?? []).filter((s) => s.url && SOCIAL_ICONS[s.network]);
  // Office line first, as in the design.
  const phones = [...(settings.phones ?? [])].sort((a, b) => Number(a.startsWith("+")) - Number(b.startsWith("+")));

  return (
    <footer className="relative bg-footer pt-8 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pt-10">
      <div className="container-x flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative h-24 w-[10.1875rem] shrink-0 sm:h-[9.6875rem] sm:w-[16.4375rem]">
            <img loading="lazy" src="/layout/footer-logo.webp" alt="Skolarrs Solutions" className="absolute inset-0 size-full object-cover" />
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-between lg:pl-4">
            <div>
              {COMPANY.map((c) => (
                <FooterSection key={c.title} title={c.title}>
                  {c.links.map((l) => (
                    <FLink key={l.label} href={l.href}>
                      {l.label}
                    </FLink>
                  ))}
                </FooterSection>
              ))}
            </div>
            {[COUNTRIES, HELP].map((c) => (
              <FooterSection key={c.title} title={c.title}>
                {c.links.map((l) => (
                  <FLink key={l.label} href={l.href}>
                    {l.label}
                  </FLink>
                ))}
              </FooterSection>
            ))}
            <div className="order-first mb-2 flex flex-col gap-[0.3125rem] sm:order-none sm:mb-0">
              <div>
                <Heading>Contact Us</Heading>
                {phones.map((p) => (
                  <a key={p} href={telHref(p)} className={CONTACT_LINK}>
                    {p}
                  </a>
                ))}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className={CONTACT_LINK}>
                    {settings.email}
                  </a>
                )}
              </div>
              {settings.address && (
                <div>
                  <Heading>Address</Heading>
                  <address className="whitespace-pre-line px-4 py-2 text-h6 font-medium not-italic text-white">{settings.address}</address>
                </div>
              )}
            </div>
          </div>
        </div>

        <img loading="lazy" src="/layout/line.svg" alt="" className="h-px w-full" />

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="flex h-[3.4375rem] items-center gap-6 px-2.5 sm:gap-12">
            {social.map((s) => {
              const icon = SOCIAL_ICONS[s.network];
              return (
                <a key={s.network} href={s.url} target="_blank" rel="noreferrer" aria-label={s.network} className="flex size-11 items-center justify-center transition hover:opacity-80">
                  <img loading="lazy" src={icon.src} alt="" style={{ width: `${icon.w / 16}rem`, height: `${icon.h / 16}rem` }} />
                </a>
              );
            })}
          </div>

          <div className="grid grid-cols-3 place-items-center gap-x-8 gap-y-5 md:flex md:flex-wrap md:items-center md:justify-center md:gap-10">
            <img loading="lazy" src="/layout/cert1.svg" alt="AAERI" width={49} height={50} className="h-[3.125rem] w-[3.0625rem]" />
            <Divider />
            <img loading="lazy" src="/layout/icef.webp" alt="ICEF" className="h-[3.125rem] w-[2.6875rem] object-cover" />
            <Divider />
            <img loading="lazy" src="/layout/ucas.svg" alt="UCAS" className="h-4 w-[3.75rem]" />
            <Divider />
            <img loading="lazy" src="/layout/airc.webp" alt="AIRC" className="h-[3.375rem] w-[3.3125rem] object-cover" />
            <Divider />
            <span className="relative size-14 overflow-hidden rounded-full">
              <img loading="lazy" src="/layout/iso.webp" alt="ISO 14001 certified" className="absolute top-[-10.6%] left-[-10.6%] size-[121.19%] max-w-none" />
            </span>
            <Divider />
            <span className="relative h-[3.375rem] w-[3.0625rem]">
              <img loading="lazy" src="/layout/cert2a.svg" alt="AAEA" className="absolute inset-[0_0_21.72%_1.11%]" />
              <img loading="lazy" src="/layout/cert2b.svg" alt="" className="absolute inset-[82.86%_0.47%_0_0]" />
            </span>
          </div>

          <Button href="/#contact" className="w-full sm:w-auto">
            Free Counselling
          </Button>
        </div>

        <img loading="lazy" src="/layout/line.svg" alt="" className="h-px w-full" />

        <div className="flex flex-col items-center gap-3 text-center text-label lg:flex-row lg:justify-between">
          <p className="text-white sm:flex sm:items-center sm:gap-1">
            <img loading="lazy" src="/layout/copyright.svg" alt="" className="mr-1 inline-block size-6 align-[-0.4rem] sm:mr-0" />
            <span>
              2026 <span className="font-medium text-gold">SkolarrsSolutions</span>. All Rights Reserved
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-0">
            {["Privacy Policy", "Terms of Use", "Payment Terms"].map((t) => (
              <Link key={t} href="#" className="py-2 font-medium text-sky hover:underline sm:px-4">
                {t}
              </Link>
            ))}
          </div>
          <p className="font-medium text-white">
            Designed &amp; Developed By <span className="font-semibold text-gold">mits</span>
          </p>
        </div>
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        className="absolute top-8 right-4 flex size-11 items-center justify-center rounded-full border border-white p-2 transition hover:bg-white/10 sm:top-10 sm:size-14 sm:p-2.5 lg:right-[3.4375rem] lg:top-[37.8125rem]"
      >
        <img loading="lazy" src="/layout/up.svg" alt="" className="size-7 sm:size-9" />
      </a>
    </footer>
  );
}
