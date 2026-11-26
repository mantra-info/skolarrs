import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-primary-gradient text-[color:var(--theme-btn-text,#fff)] hover:brightness-110",
  secondary: "bg-secondary-gradient text-[color:var(--theme-btn-text,var(--color-grey-500))] hover:brightness-105",
};

const arrows = {
  primary: "/layout/arrow-white.svg",
  secondary: "/layout/arrow-dark.svg",
};

/** Pill CTA from the Figma "Button-Primary" / "Button-Secondary" components. */
export default function Button({ href, children, variant = "primary", className = "", arrow = true, type = "button" }: Props) {
  const cls = `inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-base font-medium transition md:h-[4.5rem] md:px-10 md:text-h6 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <img loading="lazy" src={arrows[variant]} alt="" width={24} height={24} className="size-6 shrink-0 [filter:var(--theme-btn-art,none)]" />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {content}
    </button>
  );
}
