import Button from "./Button";

type Props = {
  title: React.ReactNode;
  description?: React.ReactNode;
  cta?: { label: string; href: string; variant?: "primary" | "secondary" };
  /** CSS background for the section (colour or gradient). */
  background: string;
  /** Absolutely positioned artwork laid out on the 1920x800 Figma frame. */
  art?: React.ReactNode;
  /** Standalone artwork placed after the copy in the mobile/tablet layout. */
  mobileImage?: string;
  /** Text block top offset / width on the 1920 frame. */
  textTop?: number;
  textWidth?: number;
  dark?: boolean;
  /** Full-bleed layer behind the artwork (e.g. a texture), not scaled. */
  backdrop?: React.ReactNode;
};

/** Inner-page hero: rem artwork follows the fluid desktop root size. */
export default function PageHero({ title, description, cta, background, art, textTop = 299, textWidth = 733, dark, backdrop, mobileImage }: Props) {
  return (
    <section className={`relative overflow-hidden lg:h-[50rem] ${mobileImage ? "" : "min-h-[42.5rem] md:min-h-[37.5rem] lg:min-h-0"}`} style={{ background }}>
      {backdrop}
      {art && (
        <div className="absolute right-0 bottom-0 hidden h-[50rem] w-[120rem] overflow-hidden lg:block">
          {art}
        </div>
      )}
      <div className="container-x relative pb-10 pt-32 md:pt-44 lg:pb-0 lg:pt-[var(--hero-top)]" style={{ "--hero-top": `${textTop / 16}rem` } as React.CSSProperties}>
        <div className="flex max-w-full flex-col items-start gap-[1.625rem]" style={{ width: `${textWidth / 16}rem` }}>
          <h1 className={`text-[2rem]/[2.5rem] font-bold tracking-[-0.025rem] md:text-h2 ${dark ? "text-ink" : "text-white"}`}>{title}</h1>
          {description && <p className={`text-base md:text-h6 ${dark ? "text-grey-500" : "text-white"}`}>{description}</p>}
          {cta && (
            <Button href={cta.href} variant={cta.variant ?? "primary"}>
              {cta.label}
            </Button>
          )}
        </div>
      </div>
      {mobileImage && <img src={mobileImage} alt="" className="relative mx-auto h-auto w-full max-w-[24rem] object-contain object-bottom lg:hidden" />}
    </section>
  );
}
