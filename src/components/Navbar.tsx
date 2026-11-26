"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/study-abroad", label: "Study Abroad" },
  { href: "/study-india", label: "Study India" },
  { href: "/study-mbbs", label: "Study MBBS" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Company" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-x flex h-24 items-center justify-between md:h-[9.6875rem]">
        <Link href="/" aria-label="Skolarrs Solutions home" className="relative h-20 w-[8.5rem] shrink-0 md:h-[9.6875rem] md:w-[16.4375rem]">
          <img src="/layout/nav-logo.webp" alt="Skolarrs Solutions" className="absolute inset-0 size-full object-cover" />
        </Link>

        <nav className="hidden items-center lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-3 text-h6 whitespace-nowrap text-white transition hover:text-gold lg:px-6 ${isActive(l.href) ? "font-semibold" : "font-normal"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contact" variant="secondary">
            Free Counselling
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/15 lg:hidden"
        >
          <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="mx-4 rounded-2xl bg-royal/95 p-4 shadow-xl backdrop-blur lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 text-white hover:bg-white/10 ${isActive(l.href) ? "font-semibold" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 px-2">
            <Button href="/#contact" variant="secondary" className="w-full">
              Free Counselling
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
