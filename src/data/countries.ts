export type Country = { slug: string; name: string };

/** Study-abroad destinations in the order shown on the Study Abroad page. */
export const COUNTRIES: Country[] = [
  { slug: "canada", name: "Canada" },
  { slug: "united-kingdom", name: "United Kingdom" },
  { slug: "ireland", name: "Ireland" },
  { slug: "australia", name: "Australia" },
  { slug: "usa", name: "USA" },
  { slug: "france", name: "France" },
  { slug: "germany", name: "Germany" },
  { slug: "finland", name: "Finland" },
  { slug: "netherlands", name: "Netherlands" },
  { slug: "uae", name: "UAE" },
  { slug: "singapore", name: "Singapore" },
  { slug: "spain", name: "Spain" },
  { slug: "poland", name: "Poland" },
  { slug: "italy", name: "Italy" },
  { slug: "switzerland", name: "Switzerland" },
  { slug: "china", name: "China" },
];

export const countryImage = (slug: string) => `/countries/${slug}.webp`;
export const countryFlag = (slug: string) => `/flags/round/${slug}.svg`;
