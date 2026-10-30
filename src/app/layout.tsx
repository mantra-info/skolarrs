import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Skolarrs Solutions | Study India & Abroad",
    template: "%s | Skolarrs Solutions",
  },
  description:
    "Skolarrs Solutions guides students to the right universities in India and abroad — counselling, admissions, visas, scholarships and education loans.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="top" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
