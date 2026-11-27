import Hero from "@/components/home/Hero";
import Strength from "@/components/home/Strength";
import Services from "@/components/home/Services";
import Journey from "@/components/home/Journey";
import Destination from "@/components/home/Destination";
import TrendingCourses from "@/components/home/TrendingCourses";
import Banners from "@/components/home/Banners";
import JourneyCompare from "@/components/home/JourneyCompare";
import Events from "@/components/home/Events";
import Loans from "@/components/home/Loans";
import Partners from "@/components/home/Partners";
import Blogs from "@/components/home/Blogs";
import SiteFaq from "@/components/SiteFaq";
import ContactSection from "@/components/ContactSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME, type HomeDoc } from "@/sanity/lib/queries";

export default async function HomePage() {
  const home = (await sanityFetch<HomeDoc | null>({ query: HOME, tags: ["homePage"] })) ?? {};

  return (
    <>
      <Hero slides={(home.heroSlides ?? []).filter((s) => !s.hidden)} />
      <Strength home={home} />
      <Services home={home} />
      <Journey home={home} />
      <Destination home={home} />
      <TrendingCourses home={home} />
      <Banners home={home} />
      <JourneyCompare home={home} />
      <Events />
      <Loans home={home} />
      <Partners home={home} />
      <Blogs home={home} />
      <SiteFaq page="home" />
      <ContactSection />
    </>
  );
}
