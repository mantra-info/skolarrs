import { sanityFetch } from "@/sanity/lib/fetch";
import { SETTINGS, telHref, type SettingsDoc } from "@/sanity/lib/queries";
import ContactForm from "./ContactForm";

const MAP_URL = "https://maps.google.com/?q=The+Grand+Hub+Avinashi+Road+Peelamedu+Coimbatore";

export default async function ContactSection() {
  const settings = (await sanityFetch<SettingsDoc | null>({ query: SETTINGS, tags: ["siteSettings"] })) ?? {};
  const contacts = [
    ...(settings.phones ?? []).map((p) => ({ label: p, href: telHref(p) })),
    ...(settings.email ? [{ label: settings.email, href: `mailto:${settings.email}` }] : []),
  ];

  return (
    <section id="contact" className="scroll-mt-8 bg-surface pt-16 pb-10 md:pt-20">
      <div className="container-x flex flex-col items-center gap-5">
        <div className="flex w-full max-w-[82.6875rem] flex-col overflow-hidden rounded-3xl lg:flex-row">
          <ContactForm title={settings.contactTitle ?? "Get In Touch"} body={settings.contactBody} />

          <a
            href={settings.mapUrl || MAP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open our location in Google Maps"
            className="relative block h-[20rem] overflow-hidden bg-white lg:h-[33.375rem] lg:w-[39.75rem] lg:rounded-r-2xl"
          >
            <img loading="lazy" src="/contact/map.webp" alt="" className="absolute top-[-0.5625rem] left-[-1.66688rem] h-[36rem] w-[43.0833rem] max-w-none object-cover" />
            <img loading="lazy" src="/contact/pin.svg" alt="" className="absolute top-[45%] left-[42%] h-[2.1875rem] w-7 lg:top-[14.5rem] lg:left-[16.0312rem]" />
          </a>
        </div>

        <div className="flex w-full max-w-[82.625rem] flex-col items-center justify-between gap-4 py-5 lg:flex-row">
          <p className="px-2 py-4 text-[1.625rem]/[2.375rem] font-semibold tracking-[-0.0125rem] text-[#2b2827] md:text-h4">Need Assistance?</p>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-[2.1875rem]">
            {contacts.map((c, i) => (
              <div key={c.label} className="flex items-center gap-[2.1875rem]">
                {i > 0 && <span className="hidden h-[3.125rem] w-px bg-[#cecece] lg:block" />}
                <a href={c.href} className="group flex items-center gap-2.5 text-xl/[1.875rem] font-semibold tracking-[-0.009375rem] text-[#2b2827] md:text-h5">
                  {c.label}
                  <img loading="lazy" src="/icons/arrow-orange.svg" alt="" className="size-[1.875rem] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
