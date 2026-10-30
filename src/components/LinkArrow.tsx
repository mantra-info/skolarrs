import Link from "next/link";

/** Gradient text link with arrow (Figma "Button-Link"). */
export default function LinkArrow({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2.5 py-2 ${className}`}>
      <span className="bg-primary-gradient bg-clip-text text-h6 font-medium text-transparent">{children}</span>
      <img loading="lazy" src="/icons/arrow-blue.svg" alt="" className="size-6 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
