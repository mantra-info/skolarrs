import Link from "next/link";
import Button from "./Button";

type Col = { title: string; links: { label: string; href: string }[] };

const COMPANY: Col[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "How We Help", href: "/services" },
      { label: "Study Destinations", href: "/study-abroad" },
      { label: "Course Search", href: "/courses/engineering" },
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

const SOCIAL = [
  { label: "Facebook", src: "/layout/facebook.svg", w: 18.66, h: 32.74, href: "https://facebook.com" },
  { label: "Instagram", src: "/layout/instagram.svg", w: 28.06, h: 28.06, href: "https://instagram.com" },
  { label: "WhatsApp", src: "/layout/whatsapp.svg", w: 32.92, h: 32.74, href: "https://wa.me/919790444443" },
  { label: "YouTube", src: "/layout/youtube.svg", w: 41.63, h: 28.06, href: "https://youtube.com" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-5 text-h6 font-semibold text-gold">{children}</p>;
}

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

export default function Footer() {
  return (
    <footer className="relative bg-footer pt-10 pb-5">
      <div className="container-x flex flex-col gap-5">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="relative h-[9.6875rem] w-[16.4375rem] shrink-0">
            <img loading="lazy" src="/layout/footer-logo.webp" alt="Skolarrs Solutions" className="absolute inset-0 size-full object-cover" />
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:justify-between lg:pl-4">
            <div>
              {COMPANY.map((c) => (
                <div key={c.title}>
                  <Heading>{c.title}</Heading>
                  {c.links.map((l) => (
                    <FLink key={l.label} href={l.href}>
                      {l.label}
                    </FLink>
                  ))}
                </div>
              ))}
            </div>
            {[COUNTRIES, HELP].map((c) => (
              <div key={c.title}>
                <Heading>{c.title}</Heading>
                {c.links.map((l) => (
                  <FLink key={l.label} href={l.href}>
                    {l.label}
                  </FLink>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-[0.3125rem]">
              <div>
                <Heading>Contact Us</Heading>
                <a href="tel:04224370044" className="block break-words px-4 py-2 text-h6 font-medium text-white hover:text-gold">
                  0422 - 437 00 44
                </a>
                <a href="tel:+919790444443" className="block break-words px-4 py-2 text-h6 font-medium text-white hover:text-gold">
                  +91 97904 44443
                </a>
                <a href="mailto:info@skolarssolutions.com" className="block break-words px-4 py-2 text-h6 font-medium text-white hover:text-gold">
                  info@skolarssolutions.com
                </a>
              </div>
              <div>
                <Heading>Address</Heading>
                <address className="px-4 py-2 text-h6 font-medium not-italic text-white">
                  1515, 3rd Floor, The Grand Hub
                  <br />
                  Opp Varatharaja Mill, Avinashi Road
                  <br />
                  Peelamedu, Coimbatore - 641004
                </address>
              </div>
            </div>
          </div>
        </div>

        <img loading="lazy" src="/layout/line.svg" alt="" className="h-px w-full" />

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <div className="flex h-[3.4375rem] items-center gap-12 px-2.5">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-80">
                <img loading="lazy" src={s.src} alt="" style={{ width: `${s.w / 16}rem`, height: `${s.h / 16}rem` }} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
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

          <Button href="/#contact">Free Counselling</Button>
        </div>

        <img loading="lazy" src="/layout/line.svg" alt="" className="h-px w-full" />

        <div className="flex flex-col items-center gap-3 text-label lg:flex-row lg:justify-between">
          <p className="flex items-center gap-1 text-white">
            <img loading="lazy" src="/layout/copyright.svg" alt="" className="size-6" />
            2026 <span className="font-medium text-gold">SkolarrsSolutions</span>. All Rights Reserved
          </p>
          <div className="flex">
            {["Privacy Policy", "Terms of Use", "Payment Terms"].map((t) => (
              <Link key={t} href="#" className="px-4 py-2 font-medium text-sky hover:underline">
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
        className="absolute right-4 bottom-36 flex size-14 items-center justify-center rounded-full border border-white p-2.5 transition hover:bg-white/10 lg:right-[3.4375rem] lg:bottom-auto lg:top-[37.8125rem]"
      >
        <img loading="lazy" src="/layout/up.svg" alt="" className="size-9" />
      </a>
    </footer>
  );
}
