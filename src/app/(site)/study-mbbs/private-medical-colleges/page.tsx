import type { Metadata } from "next";
import CenteredHero from "@/components/CenteredHero";
import IntroPoints from "@/components/IntroPoints";
import PromoBanner from "@/components/PromoBanner";
import UniversityList from "@/components/UniversityList";
import { ICON_CAMPUS, ICON_CLINICAL, ICON_EDUCATION, ICON_FACULTY, ICON_GLOBAL, ICON_LEARNING } from "@/data/icons";

export const metadata: Metadata = { title: "Private Medical Colleges" };

const L = "/private/colleges";
const COLLEGES = [
  { name: "PSG Medical College & Hospital, Coimbatore", logo: `${L}/psg.webp`, h: 47 },
  { name: "Karpagam Faculty of Medical Sciences & Research Coimbatore", logo: `${L}/karpagam.webp`, h: 47 },
  { name: "Velammal Medical College Hospital & Research Institute", logo: `${L}/velammal.webp`, h: 47 },
  { name: "Panimalar Medical College Hospital & Research Institute", logo: `${L}/panimalar.webp`, h: 47 },
  { name: "Sri Muthukumaran Medical College Hospital & Research Institute, Chennai", logo: `${L}/muthukumaran.webp`, h: 47 },
  { name: "KMCH Institute of Health Sciences & Research, Coimbatore", logo: `${L}/kmch.webp`, h: 63 },
  { name: "Annapoorana Medical College & Hospital, Salem", logo: `${L}/annapoorana.webp`, h: 63 },
  { name: "Trichy SRM Medical College Hospital & Research Centre", logo: `${L}/srm.webp`, h: 63 },
  { name: "Madha Medical College & Hospital, Chennai", logo: `${L}/madha.webp`, h: 63 },
  { name: "Dhanalakshmi Srinivasan Medical College & Hospital, Perambur", logo: `${L}/dhanalakshmi.webp`, h: 63 },
];

const QUOTAS = [
  { title: "Govt. Quota", icon: "/private/icon-quota-govt.svg", fee: "4.35 Lakh - 4.50 Lakh", route: "NEET, State Counselling" },
  { title: "Management Quota", icon: "/private/icon-quota.svg", fee: "15 Lakh", route: "NEET" },
  { title: "NRI Quota", icon: "/private/icon-quota.svg", fee: "27 Lakh", route: "NEET, NRI Sponsorship" },
];

export default function PrivateMedicalCollegesPage() {
  return (
    <>
      <CenteredHero
        image="/private/hero.webp"
        crumbs={[{ label: "India", href: "/study-mbbs" }, { label: "Private Medical Colleges" }]}
        title="Private Medical Colleges"
      />

      <IntroPoints
        small
        title="Why Private Medical Colleges"
        points={[
          { label: "Quality Medical Education", layers: ICON_EDUCATION },
          { label: "Clinical Exposure and Practical Learning", layers: ICON_CLINICAL },
          { label: "Modern Learning Facilities", layers: ICON_LEARNING },
          { label: "Experienced Faculty and Academic Support", layers: ICON_FACULTY },
          { label: "Campus and Student Life", layers: ICON_CAMPUS },
          { label: "Opportunities for Future Specialisation", layers: ICON_GLOBAL },
        ]}
      >
        <p>
          Private medical colleges in India play a vital role in shaping the future of healthcare by offering quality medical education, modern infrastructure,
          and extensive clinical exposure. With advanced teaching facilities, experienced faculty, and affiliations with reputed hospitals, these institutions
          provide aspiring doctors with excellent opportunities to pursue MBBS and other medical programs. Private medical colleges also help bridge the gap in
          medical education by increasing the number of available seats and providing students with diverse learning environments across the country.
        </p>
      </IntroPoints>

      <UniversityList title="Top Private Medical Colleges" items={COLLEGES} radius="rounded-lg" pageSize={10} />

      <section className="bg-secondary-gradient py-16 md:py-20">
        <div className="container-x flex flex-col gap-12">
          <h2 className="text-[1.875rem]/[2.375rem] font-semibold tracking-[-0.01875rem] text-ink md:text-h3">Tuition Fee Range</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUOTAS.map((q) => (
              <div key={q.title} className="flex flex-col gap-6 rounded-2xl border-[0.5px] border-[#cecece] bg-white p-6">
                <div className="flex items-center gap-2">
                  <span className="relative size-10 shrink-0 overflow-hidden">
                    <img loading="lazy" src={q.icon} alt="" className="absolute top-0 left-[4.1%] h-full w-[91.8%]" />
                  </span>
                  <h3 className="text-h5 font-bold text-ink">{q.title}</h3>
                </div>
                <span className="h-px w-full bg-[#d9d9d9]" />
                <ul className="flex flex-col gap-3 text-h6 font-medium text-[#3c3c3c]">
                  {[q.fee, q.route].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <img loading="lazy" src="/icons/pointer-click.svg" alt="" className="mt-[0.1875rem] size-6 shrink-0 -scale-y-100 rotate-180" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner src="/russia/promo.webp" alt="MBBS Abroad — Your dream. A healthier world." crop="top-[-6.15%] h-[112.5%]" />
    </>
  );
}
