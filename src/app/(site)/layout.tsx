import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Public site chrome. Kept out of the root layout so /studio renders full-screen. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
