import { defineQuery } from "next-sanity";
import { img, type SanityImage } from "./image";

// ---------- shared ----------

const UNI = `{ name, logo, "slug": slug.current, hasDetailPage }`;

export type UniCard = { name: string; logo: SanityImage; slug: string; hasDetailPage?: boolean };

/** Logo cards for <UniversityList>; colleges with their own page link to it. */
export const uniItems = (unis: UniCard[] = []) =>
  unis.map((u) => ({ name: u.name, logo: img(u.logo, 400), h: 47, href: u.hasDetailPage ? `/colleges/${u.slug}` : undefined }));
export type Row = { label: string; value: string };
export type TitleBody = { title: string; body?: string };
export type ImageCard = TitleBody & { image: SanityImage };

// ---------- countries ----------

export const COUNTRY_LIST = defineQuery(`*[_type == "country"] | order(order asc) { name, "slug": slug.current, flag, cardImage }`);
export type CountryCard = { name: string; slug: string; flag: SanityImage; cardImage: SanityImage };

export const COUNTRY_SLUGS = defineQuery(`*[_type == "country" && defined(slug.current)].slug.current`);

export const COUNTRY = defineQuery(`*[_type == "country" && slug.current == $slug][0]{
  name, "slug": slug.current, heroImage, cardImage, whyBody, universitiesBody,
  "universities": universities[]->${UNI},
  coursesBody, courses, eligibilityBody, examsBody, costBody, costOfStudy, costOfLiving,
  applicationBody, requirements, promo, seo
}`);
export type Country = {
  name: string;
  slug: string;
  heroImage?: SanityImage;
  cardImage?: SanityImage;
  whyBody?: string;
  universitiesBody?: string;
  universities?: UniCard[];
  coursesBody?: string;
  courses?: string[];
  eligibilityBody?: string;
  examsBody?: string;
  costBody?: string;
  costOfStudy?: Row[];
  costOfLiving?: Row[];
  applicationBody?: string;
  requirements?: TitleBody[];
  promo?: SanityImage;
  seo?: Seo;
};

// ---------- course categories ----------

export const COURSE_CATEGORY_LIST = defineQuery(
  `*[_type == "courseCategory"] | order(order asc) { title, "slug": slug.current, summary, color, icon, "hasPage": defined(aboutBody) }`,
);
export type CourseCategoryCard = { title: string; slug: string; summary?: string; color?: string; icon: SanityImage; hasPage: boolean };

export const COURSE_CATEGORY_SLUGS = defineQuery(`*[_type == "courseCategory" && defined(aboutBody)].slug.current`);

export const COURSE_CATEGORY = defineQuery(`*[_type == "courseCategory" && slug.current == $slug && defined(aboutBody)][0]{
  title, "slug": slug.current, heroTitle, heroSlides, aboutBody, benefits, trending,
  "universities": universities[]->${UNI}, promo, seo
}`);
export type CourseCategory = {
  title: string;
  slug: string;
  heroTitle?: string;
  heroSlides?: SanityImage[];
  aboutBody?: string;
  benefits?: ImageCard[];
  trending?: ImageCard[];
  universities?: UniCard[];
  promo?: SanityImage;
  seo?: Seo;
};

// ---------- colleges ----------

export const COLLEGE_SLUGS = defineQuery(`*[_type == "university" && hasDetailPage == true].slug.current`);

export const COLLEGE = defineQuery(`*[_type == "university" && slug.current == $slug && hasDetailPage == true][0]{
  _id, name, "slug": slug.current,
  "category": courseCategory->{ title, "slug": slug.current },
  heroImage, about, aboutImage, pillars, stats, campusGallery, ugProgrammes, pgProgrammes, seo,
  "reviews": *[_type == "testimonial" && references(^._id)] | order(_createdAt asc) { name, course, rating, quote }
}`);
export type College = {
  _id: string;
  name: string;
  slug: string;
  category?: { title: string; slug: string };
  heroImage?: SanityImage;
  about?: string[];
  aboutImage?: SanityImage;
  pillars?: TitleBody[];
  stats?: Row[];
  campusGallery?: SanityImage[];
  ugProgrammes?: TitleBody[];
  pgProgrammes?: TitleBody[];
  seo?: Seo;
  reviews: { name: string; course?: string; rating?: number; quote?: string }[];
};

// ---------- MBBS ----------

export const MBBS_LIST = defineQuery(`*[_type == "mbbsDestination"] | order(order asc) { name, "slug": slug.current, region, cardImage, flag, hasDetailPage }`);
export type MbbsCard = { name: string; slug: string; region: "abroad" | "india"; cardImage: SanityImage; flag?: SanityImage; hasDetailPage?: boolean };

export const MBBS_SLUGS = defineQuery(`*[_type == "mbbsDestination" && hasDetailPage == true].slug.current`);

export const MBBS = defineQuery(`*[_type == "mbbsDestination" && slug.current == $slug && hasDetailPage == true][0]{
  name, "slug": slug.current, region, heroImage, introTitle, introBody, keyPoints, universitiesTitle,
  "universities": universities[]->${UNI}, fees, whyImage, whyItems, promo, seo
}`);
export type Mbbs = {
  name: string;
  slug: string;
  region: "abroad" | "india";
  heroImage?: SanityImage;
  introTitle?: string;
  introBody?: string;
  keyPoints?: { label: string; icon?: string }[];
  universitiesTitle?: string;
  universities?: UniCard[];
  fees?: { title: string; fee?: string; route?: string }[];
  whyImage?: SanityImage;
  whyItems?: TitleBody[];
  promo?: SanityImage;
  seo?: Seo;
};

// ---------- shared sections ----------

export const FAQS = defineQuery(`*[_type == "faq" && $page in pages] | order(order asc) { question, answer, category }`);
export type FaqDoc = { question: string; answer: string; category?: string };

export const EVENTS = defineQuery(
  `*[_type == "event" && (!defined(endDate) || endDate >= $today)] | order(startDate desc, _createdAt asc) { title, tag, description, image, cta }`,
);
export type EventDoc = { title: string; tag?: string; description?: string; image: SanityImage; cta?: { label: string; href: string } };

export const PARTNERS = defineQuery(`*[_type == "partner"] | order(order asc) { name, logo, group }`);
export type PartnerDoc = { name: string; logo: SanityImage; group: "abroad" | "india" };

export type Seo = { title?: string; description?: string; image?: SanityImage };
