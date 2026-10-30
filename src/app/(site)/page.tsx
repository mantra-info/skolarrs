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
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Strength />
      <Services />
      <Journey />
      <Destination />
      <TrendingCourses />
      <Banners />
      <JourneyCompare />
      <Events />
      <Loans />
      <Partners />
      <Blogs />
      <Faq />
      <ContactSection />
    </>
  );
}
